import json
from bs4 import BeautifulSoup

with open("lego-doc-api.html",  encoding='utf-8') as fp:
    soup = BeautifulSoup(fp, 'html.parser')

for br in soup.find_all("br"):
    br.replace_with("\n")
    
apiSpec = []
for moduleNode_h3 in soup.findAll("h3"):
    print('--------------------')

    module = {}
    apiSpec.append(module)

    module['Module_Name'] = moduleNode_h3.text.strip() # h3
    module['Module_Description'] = moduleNode_h3.find_next_sibling('div').text.strip()
    module['SubModules'] = []
    module['Code_Import'] = []

    for moduleNode_h3_pre in (moduleNode_h3.parent).findChildren(
                            lambda tag:tag.name == "pre" ,
                            recursive=False
                        ):
        for moduleNode_h3_code in moduleNode_h3_pre.findAll('code'):
            codeBlock = {}
            module['Code_Import'].append(codeBlock)

            for code in moduleNode_h3_code.findAll("span", {"class": "hljs-keyword"}):    
                code.unwrap()

            for code in moduleNode_h3_code.findAll("span", {"class": "hljs-built_in"}):    
                code.unwrap()
                
            for code in moduleNode_h3_code.findAll("span", {"class": "hljs-title"}):    
                code.unwrap()

            for code in moduleNode_h3_code.findAll("span", {"class": "hljs-comment"}):    
                code.unwrap()

            for code in moduleNode_h3_code.findAll("span", {"class": "hljs-number"}):    
                code.unwrap()

            codeBlock['Python'] = moduleNode_h3_code.text
        
        
    for subModelNode_a in (moduleNode_h3.parent).findAll(
                        lambda tag:tag.name == "a" and 
                        len(tag.attrs) == 1 and
                        tag.attrs['id'].startswith("lls-help-python-spm") and
                        "section-header" not in tag.attrs['id']
                    ):
        

        if(subModelNode_a.find_next_sibling('h4') is None):
            continue

        subModule = {}
        module['SubModules'].append(subModule)

        specSubNode_h4 = subModelNode_a.find_next_sibling('h4')
        subModule['SubModel_Name'] = specSubNode_h4.text.strip()
        subModule['SubModel_Description'] = specSubNode_h4.find_next_sibling('div').text.strip()
        subModule['SubModel_Description']
        subModule['Functions'] = []
        subModule['Code_Snippet'] = []

        for funcNode_h5 in (specSubNode_h4.parent).findAll(
                    lambda tag:tag.name == "h5"
                ):
            
            if(funcNode_h5.find_next_sibling('div') is None):
                continue
            
            if(funcNode_h5.text.strip() == 'Parameters'):
                continue
            
            function = {}
            subModule['Functions'].append(function)

            function['Function_Name'] = funcNode_h5.text.strip() # h5
            function['Function_Signature'] = funcNode_h5.find_next_sibling('div').text.strip()
            function['Parameters'] = []

            for paramNode_h6 in (funcNode_h5.parent).findAll(
                        lambda tag:tag.name == "h6"
                    ):

                print(paramNode_h6)
                if(paramNode_h6.find_next_sibling('div') is None):
                    continue
                
                if(paramNode_h6.text.strip() == 'Parameters'):
                    continue

                if(paramNode_h6.text.strip() == 'Constants'):
                    continue

                funcParam = {}
                funcParam['Parameter_Name'] = paramNode_h6.text.strip()
                funcParam['Parameter_Description'] = paramNode_h6.find_next_sibling('div').text.strip()
                function['Parameters'].append(funcParam)

                
        for moduleNode_h3_code in (specSubNode_h4.parent).findAll(
                                lambda tag:tag.name == "code"and
                                "data-testid" in tag.attrs
                            ):
            codeBlock = {}
            subModule['Code_Snippet'].append(codeBlock)

            for code in moduleNode_h3_code.findAll("span", {"class": "hljs-keyword"}):    
                code.unwrap()

            for code in moduleNode_h3_code.findAll("span", {"class": "hljs-built_in"}):    
                code.unwrap()
                
            for code in moduleNode_h3_code.findAll("span", {"class": "hljs-title"}):    
                code.unwrap()

            for code in moduleNode_h3_code.findAll("span", {"class": "hljs-comment"}):    
                code.unwrap()

            for code in moduleNode_h3_code.findAll("span", {"class": "hljs-number"}):    
                code.unwrap()

            codeBlock['Python'] = moduleNode_h3_code.text


with open("lego-api-sp.json", "w") as text_file:
    text_file.write(json.dumps(apiSpec, indent=2))

# print(soup)