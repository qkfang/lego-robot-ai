import { ChatAppResponse, ChatAppResponseOrError, ChatAppRequest, Config } from "./models";
import { BACKEND_URI } from "./BACKEND_URI";

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
