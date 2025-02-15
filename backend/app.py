import os
import types
import io

import requests

from flask import Flask, request, jsonify
from PIL import Image
from typing import Union, Sequence, BinaryIO, Any

from flask.cli import load_dotenv
from google.cloud import vision
from google import genai
from google.genai import types

from authentication import authenticate_with_api_key
# for vision ai
# for deepseek // unstable for tools
from openai import OpenAI

# azure ai (cannot import) // deprecated
# from azure.cognitiveservices.vision.computervision import ComputerVisionClient
# from azure.cognitiveservices.vision.computervision.models import OperationStatusCodes
# from azure.cognitiveservices.vision.computervision.models import VisualFeatureTypes
#  msrest.authentication import CognitiveServicesCredentials
# from azure.ai.vision.imageanalysis import ImageAnalysisClient
# from azure.ai.vision.imageanalysis.models import VisualFeatures
# from azure.core.credentials import AzureKeyCredential

# from flask_cors import CORS
# from flask_limiter import Limiter
# from flask_limiter.util import get_remote_address
# import file
# import io
# import os


app = Flask(__name__)

prmt_context = "You are the brain of a system with a tagged photo gallery and a to-do list. Below are the existing tags:"
instruction = ("The user will provide you with a description of what they are trying to find, which can range from a specific photo or a reminder on the to-do list." +
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
tags_to_image = {}

# each image has a list of tags that has an image associated with it
images_to_tags = {}

# idk what this do
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
    req_file = request.files.get("image")
    path = request.args.get("path")
    name = request.args.get("name")
    format = request.args.get("format")
    img_str = path + name + '.' + format
    # # verify file integrity
    # verified_file = load_image(req_file)
    # if verified_file is None:
    #     return jsonify({'error': 'invalid '}), 400
    #     pass
    # get image context from front end
    # req_context = str(request.args.get('context')) # url / input most have context=... and his gets ...
    # get tags from deepseek (issue: deepseek might not return same tags for same input)
    unprocessed_tags = categorize(req_file)
    print(unprocessed_tags)
    processed_tags = process_ai_response(unprocessed_tags)
    assign_tags_to_image(processed_tags, img_str)
    print(tags)
    return jsonify({"tags": processed_tags})

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

        # add condition for score
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


def assign_tags_to_image(input_tags: list[str], image):

    # Assign tags to images
    images_to_tags[image] = input_tags

    # Assign image to tags
    for tag in input_tags:
        tags_to_image.setdefault(tag, []).append(image)

def update_system_instructions():
    global sys_instr
    sys_instr = (prmt_context + "\nSTART OF TAGS\n" +
            "\n".join(tags) + "\nEND OF TAGS\n" +
             instruction)

# '''
# Testing function
# '''
# def foo():
#     tags.append('games')
#     tags.append('homework')
#     tags_to_image['games'] = ['league of legends', 'overwatch']
#     images_to_tags['homework'] = ['csc236']


#==============================================================================


'''
Given a context string describing image(s) to be found, compile a list of existing tags that match the context
'''
@app.route('/search', methods=['GET'])
def search():
    description = request.args.get('desc')
    suitable_tags = get_tags(description)
    if not suitable_tags:
        return jsonify({'error': 'No tags found'}), 404


def get_tags(description: str) -> list[str]:
    interpreter = genai.Client(api_key=os.getenv("GEMINI_KEY"))

    response = interpreter.models.generate_content(
        model="gemini-2.0-flash",
        config=types.GenerateContentConfig(
            system_instruction=sys_instr
        ),
        contents=description
    )
    if response == "ERROR":
        return []
    return response.split("\n")

'''
Sample function, safe to ignore
'''
@app.route('/')
def home():
    return jsonify({"message": "Backend is running!"})


if __name__ == '__main__':
    load_dotenv()
    app.run(debug=True) # you can test functions by entering into your browser
                                   # the url 'http://localhost:3000/ROUTE_GOES_HERE?IMPUTS_GO_HERE'
    # Open http://127.0.0.1:5000 to check if the backend is running!