from flask import Flask, request, jsonify

app = Flask(__name__)

# list of tags
tags = []

# dictionaries
tags_to_image = {}

images_to_tags = {}

'''
given a context string, have DeepSeek categorize the text into several tags, both new and existing
'''
def categorize(context: str) -> list[str]:
    pass

'''
Given a context string describing image(s) to be found, have DeepSeek compile a list of existing tags that match the context
'''
def get_tags(context: str) -> list[str]:
    pass

'''
Given file and context string, save it into the dictionary with the associated tags.
A file can be categorized by multiple tags
'''
@app.route('/upload_with_tag', methods=['POST'])
def upload():
    # inputs are not given as function arguments, use request method
    # categorize(context) ...
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
