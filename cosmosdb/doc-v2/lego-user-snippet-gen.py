import os
import re
import json
from openai import AzureOpenAI


def Generate(fileIn, fileOut):
    f = open(fileIn, 'r')
    data= f.read()
    f.close()

    blocks = re.split('####', data)

    exports = []
    for block in blocks[1:]:
        desc = block.split('##--')[0].strip('\n').strip('# ')
        code = block.split('##--')[1].strip('\n')

        export = {}
        export["Python_Code"] = desc
        export["Python_Description"] = code
        exports.append(export)

    f = open(fileOut, "w")
    f.write(json.dumps(exports, indent=2))
    f.close()

Generate('lego-user-snippet.py', 'chatgpt\lego-user-snippet.json')
