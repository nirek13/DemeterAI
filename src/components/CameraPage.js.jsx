// src/components/CameraPage.js
import React, { useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const CameraPage = () => {
    const webcamRef = useRef(null);

    const capture = useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            uploadImage(imageSrc);
        },
        [webcamRef]
    );

    const uploadImage = async (base64Image) => {
        try {
            const response = await axios.post('http://localhost:5000/upload', {
                image: base64Image,
            });

            console.log('Image uploaded:', response.data);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div>
            <Webcam
                audio={false}
                height={400}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={600}
            />
            <button onClick={capture}>Capture photo</button>
        </div>
    );
};

export default CameraPage;