import os
import types

from flask import Flask, request, jsonify
from PIL import Image
from typing import Union
from typing import Sequence

from flask.cli import load_dotenv
from google.cloud import vision
from google import genai
from google.genai import types

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

context = "You are the brain of a system with a tagged photo gallery and a to-do list. Below are the existing tags:"
instruction = ("The user will provide you with a description of what they are trying to find, which can range from a specific photo or a reminder on the to-do list." +
             "Your job is to figure out which tags are related to their description and provide it to them. The only thing you should respond with are the tags you deemed to be fitting, each on a new line, or ERROR if the user input does not make sense.\n" +
             "For example, suppose the system contains the following tags:\nschool notes\nscenery\nfood\nmath\n\nSuppose the user asks \"Find the math problem I was working on last week.\" Below is what your response should be:\n"
             "school notes\nmath\n")

# list of tags
tags = []

sys_instr = (context + "\nSTART OF TAGS\n" +
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
    # verify file integrity
    verified_file = load_image(req_file)
    if verified_file is None:
        # do error
        pass
    # get image context from front end
    req_context = str(request.args.get('context')) # url / input most have context=... and his gets ...
    # get tags from deepseek (issue: deepseek might not return same tags for same input)
    returned_tags = categorize(req_context)


'''
given a context string, have DeepSeek categorize the text into several tags, both new and existing
'''
def categorize(context: str) -> list[str]:
    # client = OpenAI(api_key="<KEY>", base_url="https://api.deepseek.com")

    # tools = [
    #     {
    #         "type": "function",
    #         "function": {
    #             "name": "tokenize", # function name can be changed later
    #             "description": "<description>", # add function description
    #             "parameters": {
    #                 "type": "object",
    #                 "properties": {
    #                     # figure out properties
    #                 }
    #             }
    #         }
    #     }
    # ]
    #
    #
    # return_tags = client.chat.completions.create(
    #     model = "deepseek-chat",
    #     messages=[
    #         {"role": "system", "content": "some input"},
    #         {"role": "user", "content": "some input"},
    #         #read more on input types.
    #     ],
    #     stream=False
    # )
    pass

def assign_tags_to_image(input_tags: list[str], image):
    pass

def update_system_instructions():
    global sys_instr
    sys_instr = (context + "\nSTART OF TAGS\n" +
            "\n".join(tags) + "\nEND OF TAGS\n" +
             instruction)

'''
Testing function
'''
def foo():
    tags.append('games')
    tags.append('homework')
    tags_to_image['games'] = ['league of legends', 'overwatch']
    images_to_tags['homework'] = ['csc236']


#==============================================================================


'''
Given a context string describing image(s) to be found, have DeepSeek compile a list of existing tags that match the context
'''
@app.route('/get_tags', methods=['GET'])
def get_tags():
    description = request.args.get('desc')
    interpreter = genai.Client(api_key=os.getenv("GEMINI_KEY"))

    response = interpreter.models.generate_content(
        model="gemini-2.0-flash",
        config=types.GenerateContentConfig(
            system_instruction=sys_instr
        ),
        contents=description
    )

    return jsonify({"result": response.text})

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
