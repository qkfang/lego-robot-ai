import { ChatAppResponse, ChatAppResponseOrError, ChatAppRequest, Config } from "./models";
import { BACKEND_URI } from "./BACKEND_URI";
import { OpenAIClient, OpenAIClientOptions, AzureKeyCredential, Completions} from '@azure/openai';

function getHeaders(): Record<string, string> {
    var headers: Record<string, string> = {
        "Content-Type": "application/json"
    };
    return headers;
}


function getHeadersTranslate(): Record<string, string> {
    var headers: Record<string, string> = {
        "Content-Type": "application/json",
        'Ocp-Apim-Subscription-Region': 'eastus',
        'Ocp-Apim-Subscription-Key': 'eb3318b45d9d45e5815d51eaa8eb1c52',
    };
    return headers;
}

export async function chatApi(request: ChatAppRequest): Promise<Response> {
    const body = JSON.stringify(request);
    return await fetch(`${BACKEND_URI}/ai`, {
        method: "POST",
        mode: "cors",
        headers: getHeaders(),
        body: body
    });
}


export async function imageApi(file: File): Promise<Response> {
    const formData = new FormData();
    formData.append("file", file);
    return await fetch(`${BACKEND_URI}/image`, {
        method: "POST",
        mode: "cors",
        body: formData,
    });
}

export async function gpt4oApi(prompt: string[]): Promise<Completions> {
    const options = {
        api_version: "2023-12-01-preview"
      };

    const client = new OpenAIClient(
        "https://legorobot-openai.openai.azure.com/",
        new AzureKeyCredential("53f4ec2340964083a427811bd8417f8e"),
        options
      );
      // ?api-version=2023-12-01-preview
      const deploymentName = 'completions';
      const result = await client.getChatCompletions(deploymentName, prompt, {
        maxTokens: 200,
        temperature: 0.25
      });
      return result.choices[0].message.content;
}


export async function dalleApi(prompt: string): Promise<Completions> {
    const options = {
        api_version: "2023-12-01-preview"
      };
    const size = '1024x1024';
    const n = 1;
    const client = new OpenAIClient(
        "https://legorobot-openai.openai.azure.com/",
        new AzureKeyCredential("53f4ec2340964083a427811bd8417f8e"),
        options
      );
      // ?api-version=2023-12-01-preview
      const deploymentName = 'dalle3';
      const result = await client.getImages(deploymentName, prompt, { n, size });
      console.log(result);
      return result.data[0].url;
}

export async function translateApi(text: string, from: string, to: string): Promise<Response> {
    const url = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${to}&from=${from}`;
    const body = 
    [{
        "text": `${text}`
    }];
    
    return await fetch(url, {
        method: "POST",
        headers: getHeadersTranslate(),
        body: JSON.stringify(body),
    });
}

export function getCitationFilePath(citation: string): string {
    return `${BACKEND_URI}/content/${citation}`;
}
