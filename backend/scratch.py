import io
from typing import Sequence
from google.cloud import vision
from google.cloud import language_v1

def authenticate_with_api_key(api_key_string: str) -> None:
    """
    Authenticates with an API key for Google Language service.

    TODO(Developer): Replace this variable before running the sample.

    Args:
        api_key_string: The API key to authenticate to the service.
    """

    # Initialize the Language Service client and set the API key
    client = language_v1.LanguageServiceClient(
        client_options={"api_key": api_key_string}
    )

    text = "Hello, world!"
    document = language_v1.Document(
        content=text, type_=language_v1.Document.Type.PLAIN_TEXT
    )

    # Make a request to analyze the sentiment of the text.
    sentiment = client.analyze_sentiment(
        request={"document": document}
    ).document_sentiment

    print(f"Text: {text}")
    print(f"Sentiment: {sentiment.score}, {sentiment.magnitude}")
    print("Successfully authenticated using the API key")


authenticate_with_api_key("AIzaSyC1Yhykj27r5_GxFUqTBdnVPWVUz8nQ5vU")

client = vision.ImageAnnotatorClient()

# with io.open(context, 'rb') as image_file:
#     content = image_file.read()

# change img_path to path of image on local computer
img_path = r"C:\Users\billd\Pictures\f60a8e352e30a32b6ec386360e87d078-1024x576.jpg"
with io.open(img_path, 'rb') as image_file:
    content = image_file.read()
img = vision.Image(content=content)
#img.source.image_uri = img.image_uri(context)
# fts = Sequence()
fts = [
    vision.Feature.Type.LABEL_DETECTION,
    vision.Feature.Type.LANDMARK_DETECTION,
    vision.Feature.Type.OBJECT_LOCALIZATION,
    vision.Feature.Type.LOGO_DETECTION,
]
fts = [vision.Feature(type_=feature_type) for feature_type in fts]
req = vision.AnnotateImageRequest(image=img, features=fts)
response = client.annotate_image(request=req)

print(response)