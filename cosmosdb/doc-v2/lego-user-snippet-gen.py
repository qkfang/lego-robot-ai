import os
import re
import json
from openai import AzureOpenAI


def Generate(fileIn, fileOut):
    f = open(fileIn, 'r')
    data= f.read()
    f.close()

    blocks = re.split('###', data)
    systemMsg = {"role":"system","content": blocks[0].split('\n')[1]}


    exports = []
    for block in blocks[1:]:
        userMsg = block.split('\n')[1]
        assistMsg=""
        for blockUser in block.split('\n')[2:]:
            assistMsg += blockUser + '\n'

        export = {}
        export["messages"] = []
        export["messages"].append(systemMsg)
        export["messages"].append({"role": "user", "content": userMsg}) 
        export["messages"].append({"role": "assistant", "content": assistMsg})
        exports.append(export)

    f = open(fileOut, "w")
    for m in exports:
        f.write(json.dumps(m))
        f.write('\n')
    f.close()

Generate('training-set.dt', 'training-set.jsonl')
Generate('validation-set.dt', 'validation-set.jsonl')
