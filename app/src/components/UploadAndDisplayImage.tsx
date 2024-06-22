import React, { useState } from "react";
import {
    imageApi,
    visionApi,
    dalleApi
} from "../api";

const UploadAndDisplayImage = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>("");
    const [imageText, setImageText] = useState<string>("");

    const [imageBase64, setimageBase64] = useState<string>("");
    const [imageDesc, setImageDesc] = useState<string>("");

    const [imageDalleText, setImageDalleText] = useState<string>();
    const [imageDalleUrl, setImageDalleUrl] = useState<string>("");

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
            const response = await visionApi(messages);
            // console.log(response);
            setImageDesc(response);
        }
    }


    async function execImageCreateApi() {
        if (imageDalleText != null) {
            const response = await dalleApi(imageDalleText);
            // console.log(response);
            setImageDalleUrl(response);
            // setImageDesc(response);
        }
    }


    const updateText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImageDalleText(e.target.value);
        // console.log('edit->' + task)
    };

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
                    <h4>Your Lego Brick</h4>
                    <table>
                        <tr>
                            <td style={{ verticalAlign: 'top' }}>
                                <img
                                    height={"150px"}
                                    src={URL.createObjectURL(selectedImage)}
                                />
                            </td>
                            <td style={{ verticalAlign: 'top', width: '300px' }}>
                                {imageDesc}
                            </td>
                        </tr>
                        <tr>
                            <td style={{ verticalAlign: 'top', width: '250px' }}>
                                <button onClick={() => execImageDescApi()}>Describe The Block (GPT-4o Vision)</button><br />
                            </td>
                            <td></td>
                        </tr>
                    </table>

                    <h4>Find Similar Lego Brick</h4>
                    <table>
                        <tr>
                            <td valign="top">
                                <img height={"150px"} src={imageUrl} />
                            </td>
                            <td style={{ verticalAlign: 'top', width: '300px' }}>
                                {imageText}
                            </td>
                        </tr>
                        <tr>
                            <td style={{ verticalAlign: 'top' }}>
                                <button onClick={() => execImageMatchApi()}>Find Similar Block (Image Vector)</button><br />
                            </td>
                            <td></td>
                        </tr>
                    </table>
                    <p>Note: Due to time constraints, the Lego library only has 300 block images for now.</p>
                </div>
            )}
            <h4>Create Lego Brick By Description</h4>
            <table>
                <tr>
                    <td style={{ verticalAlign: 'top' }}>
                        <input type="text" placeholder="describe an image (e.g. lego block in rainbow color)" onChange={updateText} />
                        <button onClick={() => execImageCreateApi()}>Create Lego Brick Image (Dall-e)</button><br />
                    </td>
                </tr>
                <tr>
                    <td valign="top">
                        <img height={"150px"} src={imageDalleUrl} />
                    </td>
                </tr>
            </table>
        </div>
    );
};

export default UploadAndDisplayImage;
