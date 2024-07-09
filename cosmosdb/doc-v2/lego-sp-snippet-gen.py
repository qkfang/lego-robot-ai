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
for pre in soup.findAll(
                lambda tag:tag.name == "pre"
                ):
    
    if('main' in pre.code):
        print('---------------')
        print(pre.text)
        snippet = {}
        snippet['Python_Code'] = pre.code.text
        if(pre.find_previous_sibling('div') != None):
            snippet['Python_Description'] = pre.find_previous_sibling('div').text.strip()

        snippets.append(snippet)


with open("lego-snippets-sp.json", "w") as text_file:
    text_file.write(json.dumps(snippets, indent=2))

# print(soup)