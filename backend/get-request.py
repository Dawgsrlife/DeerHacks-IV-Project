import requests

url = "http://localhost:5000/search"
with open("C:\\Users\\ethan\\Pictures\\irl\\IMG_20240930_223539.jpg", "rb") as img:
    datas2 = {"desc": "what was the photo i took in the classroom?"}
    # print(img)
    response = requests.get(url, params=datas2)
    print(response.json())