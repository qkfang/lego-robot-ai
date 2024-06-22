import React, { useState } from "react";
import {
    visionApi,
} from "../api";

const DescribeImage = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>("");
    const [imageDesc, setImageDesc] = useState<string>("");
    const [imageBase64, setimageBase64] = useState<string>("");

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

    async function execImageApi() {
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

    return (
        <div>
            <input
                type="file"
                name="myImage"
                onChange={(event) => {
                    // console.log(event.target.files[0]); // Log the selected file
                    setSelectedImage(event.target.files[0]); // Update the state with the selected file
                    getBase64(event);
                }}
            />
            <br />
            {selectedImage && (
                <div>
                    <table>
                        <tr>
                            <td>
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
                                <h4>Description</h4>
                                <p>{imageDesc}</p>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                    <button onClick={() => execImageApi()}>Find Matching Block</button>
                </div>
            )}
        </div>
    );
};

export default DescribeImage;
