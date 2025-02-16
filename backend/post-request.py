import requests

url = "http://localhost:5000/upload_with_tag"

image_path = "C:\\Users\\ethan\\Pictures\\irl\\IMG_20240930_223539.jpg"
name = image_path.split("\\")[-1]
fmt = image_path.split(".")[-1]
path = "\\".join(image_path.split("\\")[:-1])

with open(image_path, "rb") as img:
    files = {"image": img}
    datas =  {"name": "party", "format": "jpg", "path": ""}
    # print(img)
    response = requests.get(url, files=files, params=datas)
    print(response.json())