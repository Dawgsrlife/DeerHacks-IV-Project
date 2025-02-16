import requests

url = "http://localhost:5000/timeline"

response = requests.get("http://localhost:5000/timeline")
print(response.json())