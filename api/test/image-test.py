import requests
url = 'http://127.0.0.1:4242/image'
files = {'file': open('../brick.jpg', 'rb')}
r = requests.post(url, files = files)
print(r.content)


# import requests
# url = 'https://legorobot-api.orangecliff-0ad42f82.eastus.azurecontainerapps.io/image'
# files = {'file': open('../brick.jpg', 'rb')}
# r = requests.post(url, files = files)
# print(r.content)