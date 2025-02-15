import requests

url = "http://localhost:5000/upload_with_tag"
with open("C:\\Users\\ethan\\Pictures\\irl\\IMG_20240930_223539.jpg", "rb") as img:
    files = {"image": img}
    datas =  {"name": "party", "format": "jpg", "path": ""}
    # print(img)
    response = requests.post(url, files=files, params=datas)
