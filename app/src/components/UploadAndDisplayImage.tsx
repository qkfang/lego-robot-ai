import React, { useState } from "react";
import {
    imageApi,
    gpt4oApi,
} from "../api";

const UploadAndDisplayImage = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>("");
    const [imageText, setImageText] = useState<string>("");

    const [imageBase64, setimageBase64] = useState<string>("");
    const [imageDesc, setImageDesc] = useState<string>("");

    async function execImageMatchApi() {
        if (selectedImage != null) {
            const response = await imageApi(selectedImage);
            const json = await response.json()
            // console.log(json);
            setImageUrl("https://legorobotsa.blob.core.windows.net/legoimage/" + json.message[0].image_file);
            setImageText(json.message[0].description);
        }
    }

    function getBase64(event) {
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setimageBase64(reader.result);
            // console.log(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    async function execImageDescApi() {
        var messages =
            [
                { "role": "system", "content": "You are a helpful assistant." },
                {
                    "role": "user", "content": [
                        {
                            "type": "text",
                            "text": "Describe this picture:"
                        },
                        {
                            "type": "image_url",
                            "imageUrl": {
                                "url": `${imageBase64}`
                            }
                        }
                    ]
                }
            ];

        // console.log(messages);
        if (selectedImage != null) {
            const response = await gpt4oApi(messages);
            // console.log(response);
            setImageDesc(response);
        }
    }

    return (
        <div>
            <input
                type="file"
                name="myImage"
                onChange={(event) => {
                    setSelectedImage(event.target.files[0]);
                    getBase64(event);
                }}
            />
            <br />

            {selectedImage && (
                <div>
                    <table>
                        <tr>
                            <td style={{ width: '200px' }}>
                                <h4>Your Lego Brick</h4>
                                <img
                                    height={"150px"}
                                    src={URL.createObjectURL(selectedImage)}
                                />
                            </td>
                            <td>
                                &nbsp;
                            </td>
                            <td valign="top">
                                <h4>Similar Lego Brick</h4>
                                <img height={"150px"} src={imageUrl} />
                            </td>
                        </tr>
                        <tr>
                            <td style={{verticalAlign: 'top'}}>
                                <button onClick={() => execImageDescApi()}>Describe The Block (GPT-4o Vision)</button><br/>
                                {imageDesc}</td>
                            <td></td>
                            <td style={{verticalAlign: 'top'}}>
                                <button onClick={() => execImageMatchApi()}>Find Similar Block (Image Vector)</button><br/>
                                {imageText}</td>
                        </tr>
                    </table>


                </div>
            )}
            <p>Note: Due to time constraints, the Lego library only has 300 block images for now.</p>
        </div>
    );
};

export default UploadAndDisplayImage;
