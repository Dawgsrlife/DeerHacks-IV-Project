import requests

url = "http://localhost:5000/search"
with open("C:\\Users\\ethan\\Pictures\\irl\\IMG_20240930_223539.jpg", "rb") as img:
    datas2 = {"desc": "find me the image of the man making gestures"}
    # print(img)
    response = requests.get(url, params=datas2)
    print(response.json())