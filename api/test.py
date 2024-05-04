import requests
url = 'http://127.0.0.1:4242/vector'
files = {'file': open('brick.jpg', 'rb')}
r = requests.post(url, files = files)
print(r.content)