import requests

url = "http://localhost:5000/upload_with_tag"

image_path = r"C:\Users\ethan\Pictures\Screenshots\Screenshot 2025-01-11 183545.png"
name = image_path.split("\\")[-1]
fmt = image_path.split(".")[-1]
path = "\\".join(image_path.split("\\")[:-1])

with open(image_path, "rb") as img:
    files = {"image": img}
    datas =  {"name": name, "format": fmt, "path": path}
    # print(img)
    response = requests.post(url, files=files, params=datas)
    print(response.json())