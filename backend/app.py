
from flask import Flask, request, jsonify
from PIL import Image
from typing import Union
from typing import Sequence
from google.cloud import vision
from authentication import authenticate_with_api_key
# for vision ai
# for deepseek // unstable for tools
# from openai import OpenAI

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

# list of tags
tags = []

# dictionaries
# each tag has a list of images that has that tag
tags_to_image = {}

# each image has a list of tags that has an image associated with it
images_to_tags = {}

# idk what this do
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


#
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
    # req_context = str(request.args.get('context')) # url / input most have context=... and his gets ...
    # get tags from deepseek (issue: deepseek might not return same tags for same input)
    unprocessed_tags = categorize(verified_file)
    processed_tags = process_ai_response(unprocessed_tags)


'''
given a context string, have DeepSeek categorize the text into several tags, both new and existing
'''
def categorize(context: Image.Image) -> list[str]:

    # change api key as needed
    auth = authenticate_with_api_key("AIzaSyC1Yhykj27r5_GxFUqTBdnVPWVUz8nQ5vU")
    if not auth:
        print("Authentication failed")
        return []
    client = vision.ImageAnnotatorClient()

    img = vision.Image()
    img.source.image_uri = img.image_uri(context)

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
        tag = label.description

        # add condition for score
        if tag not in tags:
            img_tags.append(tag)

    for landmark in response.landmark_annotations:
        guarantee = landmark.score
        tag = landmark.description
        if tag not in images_to_tags:
            img_tags.append(tag)

    for obj in response.localized_object_annotations:
        guarantee = obj.score
        tag = obj.description
        if tag not in tags_to_image:
            img_tags.append(tag)

    for logo in response.logo_annotations:
        guarantee = logo.score
        tag = logo.description
        if tag not in images_to_tags:
            img_tags.append(tag)

    return img_tags


def assign_tags_to_image(input_tags: list[str], image):
    pass


#==============================================================================


'''
Given a context string describing image(s) to be found, have DeepSeek compile a list of existing tags that match the context
'''
def get_tags(context: str) -> list[str]:
    pass


'''
Sample function, safe to ignore
'''
@app.route('/')
def home():
    return jsonify({"message": "Backend is running!"})


if __name__ == '__main__':
    app.run(debug=True, port=3000) # you can test functions by entering into your browser
                                   # the url 'http://localhost:3000/ROUTE_GOES_HERE?IMPUTS_GO_HERE'
    # Open http://127.0.0.1:5000 to check if the backend is running!
