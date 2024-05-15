import React, { useState } from "react";
import {
    imageApi,
} from "../api";

const UploadAndDisplayImage = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>(null);

    async function execImageApi() {
        if (selectedImage != null) {
            const response = await imageApi(selectedImage);
            const json = await response.json()
            console.log(json);
            setImageUrl("https://legorobotsa.blob.core.windows.net/legoimage/" + json.message[0].image_file);
        }
    }

    return (
        <div>
            <input
                type="file"
                name="myImage"
                onChange={(event) => {
                    console.log(event.target.files[0]); // Log the selected file
                    setSelectedImage(event.target.files[0]); // Update the state with the selected file
                }}
            />
            <br />

            {selectedImage && (
                <div>
                    <table>
                        <tr>
                            <td>
                                <h4>Your Lego</h4>
                                <img
                                    height={"150px"}
                                    src={URL.createObjectURL(selectedImage)}
                                />
                            </td>
                            <td>
                                &nbsp;
                            </td>
                            <td valign="top">
                                <h4>Matching Lego</h4>
                                <img height={"150px"} src={imageUrl} />
                            </td>
                        </tr>
                    </table>
                    <button onClick={() => execImageApi()}>Find Matching Block</button>
                </div>
            )}

        </div>
    );
};

export default UploadAndDisplayImage;
