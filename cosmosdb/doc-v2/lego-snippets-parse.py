import json
from bs4 import BeautifulSoup

with open("lego-doc-api.html",  encoding='utf-8') as fp:
    soup = BeautifulSoup(fp, 'html.parser')

# for code in soup.find_all('code'):
# for code in soup.findAll(
#                 lambda tag:tag.name == "code" and
#                 len(tag.attrs) == 1 and
#                 tag["data-testid"]
#                 ):
    
#     print('--------------------')
#     code.unwrap()
#     print(code)

for code in soup.findAll("span", {"class": "hljs-keyword"}):    
    code.unwrap()


for code in soup.findAll("span", {"class": "hljs-built_in"}):    
    code.unwrap()
    

for code in soup.findAll("span", {"class": "hljs-title"}):    
    code.unwrap()

for code in soup.findAll("span", {"class": "hljs-comment"}):    
    code.unwrap()

for code in soup.findAll("span", {"class": "hljs-number"}):    
    code.unwrap()


snippets = []
for code in soup.findAll(
                lambda tag:tag.name == "code" and
                "data-testid" in tag.attrs
                ):
    
    if('main' in code):
        print('---------------')
        print(code.text)
        snippet = {}
        snippet['name'] = ''
        snippet['python'] = code.text
        snippets.append(snippet)


with open("lego-snippets-sp.json", "w") as text_file:
    text_file.write(json.dumps(snippets))

# print(soup)