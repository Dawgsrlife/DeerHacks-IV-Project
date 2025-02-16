import os
import subprocess
import types
import io
import json

from PIL import Image
from typing import Union, Sequence, BinaryIO, Any
# for flask
from flask import Flask, request, jsonify, send_from_directory, redirect
from flask.cli import load_dotenv
# for vision ai and gemini ai
from google.cloud import vision
from google import genai
from google.genai import types
# google authentication
from authentication import authenticate_with_api_key

# from flask_cors import CORS
# from flask_limiter import Limiter
# from flask_limiter.util import get_remote_address


app = Flask(__name__)

local_resource_dir = os.path.join(os.getcwd(), 'images')


# Start React when Flask starts
@app.before_first_request
def start_react():
    try:
        # Run "npm start" inside the frontend folder
        subprocess.Popen("npm start", shell=True, cwd="frontend")
    except Exception as e:
        print(f"Error starting React: {e}")


# Redirect to React frontend
@app.route("/")
def index():
    return redirect("http://localhost:3000")


prmt_context = "You are the brain of a system with a tagged photo gallery and a to-do list. Below are the existing tags:"
instruction = (
            "The user will provide you with a description of what they are trying to find, which can range from a specific photo or a reminder on the to-do list." +
            "Your job is to figure out which tags are related to their description and provide it to them. The only thing you should respond with are the tags you deemed to be fitting, each on a new line, or ERROR if the user input does not make sense.\n" +
            "For example, suppose the system contains the following tags:\nschool notes\nscenery\nfood\nmath\n\nSuppose the user asks \"Find the math problem I was working on last week.\" Below is what your response should be:\n"
            "school notes\nmath\n")

# list of tags
tags = []

sys_instr = (prmt_context + "\nSTART OF TAGS\n" +
             "\n".join(tags) + "\nEND OF TAGS\n" +
             instruction)

# dictionaries
# each tag has a list of images that has that tag
tags_to_imgpth = {}

# each image has a list of tags that has an image associated with it
imgpth_to_tags = {}

# each path has one image
imgpth_to_img = {}

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def load_image(file) -> Union[Image.Image, None]:
    try:
        if not allowed_file(file.filename) or not file.mimetype.startswith('image/'):
            return None
        img = Image.open(file)
        img.verify()
        file.seek(0)
        return Image.open(file)
    except Exception:
        return None


'''
Given file and context string, save it into the dictionary with the associated tags.
A file can be categorized by multiple tags
'''
@app.route('/upload_with_tag', methods=['POST'])
def upload():
    # inputs are not given as function arguments, use request method
    # categorize(context) ...
    # get file from front end
    # image in bytes
    req_file = request.files.get("image")
    # other 3 parameters
    path = request.args.get("path")
    name = request.args.get("name")
    img_str = path + "\\" + name

    unprocessed_tags = categorize(req_file)
    print(unprocessed_tags)
    processed_tags = process_ai_response(unprocessed_tags)
    assign_tags_to_imgpth(processed_tags, img_str)
    print(tags)
    print(tags_to_imgpth)
    print(imgpth_to_tags)
    save_imgs()
    return jsonify({"tags": processed_tags})


def upload_folder(folder: str):
    images = get_files_from_folder(folder)
    for image in images:
        print("uploading " + image + '...')
        upload_with_args(folder + '/' + image)


def upload_with_args(image_path: str):
    with open(image_path, "rb") as f:
        req_file = io.BytesIO(f.read())

        unprocessed_tags = categorize(req_file)
        print(unprocessed_tags)
        processed_tags = process_ai_response(unprocessed_tags)
        assign_tags_to_imgpth(processed_tags, image_path)
        print(tags)
        return jsonify({"tags": processed_tags})


def get_files_from_folder(folder: str) -> list[Image]:
    directory = os.fsencode(folder)
    output_list = []

    for file in os.listdir(directory):

        if allowed_file(file.filename) and file.mimetype.startswith('image/'):
            output_list.append(file)

    return output_list


'''
given a context string, categorize the text into several tags, both new and existing
'''
def categorize(context: BinaryIO) -> Any:
    # change api key as needed
    auth = authenticate_with_api_key(os.getenv("GOOGLE_VISION_KEY"))
    if not auth:
        print("Authentication failed")
        return []
    client = vision.ImageAnnotatorClient()
    # image_file = io.BytesIO()
    # context.save(image_file, format=context.format)
    img = vision.Image(content=context.read())
    # img.source.image_uri = img.image_uri(context)

    fts = [
        vision.Feature.Type.LABEL_DETECTION,
        vision.Feature.Type.LANDMARK_DETECTION,
        vision.Feature.Type.OBJECT_LOCALIZATION,
        vision.Feature.Type.LOGO_DETECTION,
    ]
    fts = [vision.Feature(type_=feature_type) for feature_type in fts]
    req = vision.AnnotateImageRequest(image=img, features=fts)
    response = client.annotate_image(request=req)
    return response


def process_ai_response(response) -> list[str]:
    img_tags = []
    # label processing
    for label in response.label_annotations:
        guarantee = label.score
        tag = label.description.lower()
        # add condition for score ?
        if tag not in img_tags:
            img_tags.append(tag)

    for landmark in response.landmark_annotations:
        guarantee = landmark.score
        tag = landmark.description.lower()
        if tag not in img_tags:
            img_tags.append(tag)

    for obj in response.localized_object_annotations:
        guarantee = obj.score
        tag = obj.name.lower()
        if tag not in img_tags:
            img_tags.append(tag)

    for logo in response.logo_annotations:
        guarantee = logo.score
        tag = logo.description.lower()
        if tag not in img_tags:
            img_tags.append(tag)

    return img_tags


def assign_tags_to_imgpth(input_tags: list[str], image):
    # Assign tags to images
    imgpth_to_tags[image] = input_tags
    # Assign image to tags
    for tag in input_tags:
        if tag not in tags:
            tags.append(tag)
        tags_to_imgpth.setdefault(tag, []).append(image)


# Function to update system instructions
def update_system_instructions():
    global sys_instr
    sys_instr = (prmt_context + "\nSTART OF TAGS\n" +
                 "\n".join(tags) + "\nEND OF TAGS\n" + instruction)


def create_resource_directory():
    if os.path.exists(local_resource_dir):
        if not os.path.isdir(local_resource_dir):
            raise Exception("image is not a directory")
        if os.path.exists(os.path.join(local_resource_dir, 'image.txt')):
            return
        open(os.path.join(local_resource_dir, 'image.txt'), 'x').close()
    os.mkdir(local_resource_dir)
    open(os.path.join(local_resource_dir, 'image.txt'), 'x').close()


# Function to save image paths and their tags to a file
def save_imgs():
    create_resource_directory()
    with open(os.path.join(local_resource_dir, 'image.txt'), "w") as f:
        for path in imgpth_to_tags:
            f.write(path + "," + ",".join(imgpth_to_tags[path]) + "\n")


# Function to load image paths and their tags from a file
def load_imgs():
    create_resource_directory()
    with open(os.path.join(local_resource_dir, 'image.txt'), "r") as f:
        keys = f.readline().split(",")
        for tag in keys[1:]:
            tags.append(tag)
            tags_to_imgpth.setdefault(tag, []).append(keys[0])
            imgpth_to_tags.setdefault(keys[0], []).append(tag)
        update_system_instructions()


# '''
# Testing function
# '''
# def foo():
#     tags.append('games')
#     tags.append('homework')
#     tags_to_image['games'] = ['league of legends', 'overwatch']
#     images_to_tags['homework'] = ['csc236']


#==============================================================================

memory_cache = {}  # Simple dictionary for caching

'''
Given a context string describing image(s) to be found, compile a list of existing tags that match the context
'''
@app.route('/search', methods=['GET'])
def search():
    description = request.args.get('desc', '')

    # Check if query is already cached
    if description in memory_cache:
        return jsonify(memory_cache[description])

    suitable_tags = get_tags(description)
    if not suitable_tags:
        return jsonify({'error': 'No tags found'}), 404

    imgs = get_related_imgpths(suitable_tags)
    response_data = {'images': imgs, 'tags': suitable_tags}

    # Store in cache to avoid repeated API calls
    memory_cache[description] = response_data

    return jsonify(response_data)


def get_tags(description: str) -> list[str]:
    interpreter = genai.Client(api_key=os.getenv("GEMINI_KEY"))

    try:
        response = interpreter.models.generate_content(
            model="gemini-2.0-flash",
            config=types.GenerateContentConfig(system_instruction=sys_instr),
            contents=description
        )
        if response.text == "ERROR":
            return []
        return response.text.split("\n")

    except Exception as e:
        print(f"Gemini API error: {e}")
        # Return a basic fallback result for testing
        fallback_tags = ["test-tag1", "test-tag2", "test-tag3"]
        return fallback_tags  # Replace with random or pre-defined tags


# Function to get related image paths based on AI-generated tags
def get_related_imgpths(ai_tags: list[str]) -> list[str]:
    paths = []
    for tag in ai_tags:
        if tag in tags:
            paths.extend([img_pth for img_pth in tags_to_imgpth[tag] if img_pth not in paths])
    return paths


# def get_imgs_from_path(paths: list[str]) -> list:
#     images = []
#     for path in paths:
#         images.append()
#     return images

load_imgs()
load_dotenv()

# =====================================================================

# Initialize Flask App
app = Flask(__name__)

# Define paths for memories file and images directory
MEMORIES_FILE = os.path.join(os.getcwd(), "backend", "memories.json")
IMAGES_DIR = os.path.join(os.getcwd(), "backend", "images")


# Load memories from JSON file
def load_memories():
    """Loads memories from the JSON file and maps image paths correctly."""
    if not os.path.exists(MEMORIES_FILE):
        return {"memories": []}

    try:
        with open(MEMORIES_FILE, "r") as file:
            data = json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        return {"memories": []}

    # Ensure image paths are correct
    for memory in data.get("memories", []):
        memory["images"] = [
            f"/images/{img}" for img in memory.get("images", []) if os.path.exists(os.path.join(IMAGES_DIR, img))
        ]

    return data


# Save memories to JSON file
def save_memories(memories):
    """Save updated memory data to file."""
    with open(MEMORIES_FILE, "w") as file:
        json.dump({"memories": memories}, file, indent=4)


# API: Fetch Timeline Data
@app.route('/timeline', methods=['GET'])
def get_timeline():
    """Fetch all memories and return them in chronological order."""
    memories = load_memories().get("memories", [])

    # Sort memories by date (most recent first)
    sorted_memories = sorted(memories, key=lambda m: m["date_added"], reverse=True)

    return jsonify({"memories": sorted_memories})


# API: Search for Memories Based on Query
@app.route('/search', methods=['GET'])
def search():
    """Search memories based on description or tags."""
    description = request.args.get('desc', '').lower()
    memories = load_memories().get("memories", [])

    # Find matching memories
    results = [
        memory for memory in memories
        if description in memory["description"].lower() or any(description in tag for tag in memory["tags"])
    ]

    if not results:
        return jsonify({"error": "No memories found"}), 404

    return jsonify({
        "images": [memory["images"] for memory in results if memory["images"]],
        "tags": list(set(tag for memory in results for tag in memory["tags"]))
    })


# API: Add a New Memory
@app.route('/add_memory', methods=['POST'])
def add_memory():
    """Add a new memory with an image path, description, tags, and date."""
    data = request.json
    required_fields = {"image_path", "description", "tags", "date_added"}

    if not data or not required_fields.issubset(data):
        return jsonify({"error": "Missing required fields"}), 400

    memories = load_memories().get("memories", [])
    memories.append(data)
    save_memories(memories)

    return jsonify({"message": "Memory added successfully!"})


# Run Flask app
if __name__ == '__main__':
    app.run(debug=True)  # you can test functions by entering into your browser
    # the url 'http://localhost:3000/ROUTE_GOES_HERE?IMPUTS_GO_HERE'
    # Open http://127.0.0.1:5000 to check if the backend is running!
