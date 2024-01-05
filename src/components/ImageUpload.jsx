import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import Papa from 'papaparse';
import { animated, useSpring } from 'react-spring';
import { Pie } from 'react-chartjs-2';
import './ImageUpload.css';
import { Chart } from 'chart.js/auto';

const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [results, setResults] = useState(null);
    const shine = useSpring({
        from: { backgroundPosition: '100% 0' },
        to: { backgroundPosition: '0% 0' },
        loop: { reverse: true },
    });

    const onDrop = useCallback((acceptedFiles) => {
        setSelectedFile(acceptedFiles[0]);
        setUploadSuccess(false);
        setResults(null);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
        maxFiles: 1,
    });

    const handleUpload = async () => {
        if (selectedFile) {
            try {
                const formData = new FormData();
                formData.append('image', selectedFile);

                const response = await axios.post(
                    'http://localhost:5003/upload',
                    formData
                );

                console.log('Image uploaded successfully:', response.data);
                setUploadSuccess(true);
            } catch (error) {
                console.error('Error uploading image:', error.message);
                setUploadSuccess(false);
            }
        } else {
            console.warn('Please select an image before uploading.');
        }
    };

    const fetchData = async () => {
        try {
            // Dynamic CSV file path
            const csvFilePath = process.env.PUBLIC_URL + '/path/to/results.csv';

            const responseCsv = await fetch(csvFilePath);

            if (!responseCsv.ok) {
                console.log('Failed to fetch CSV:', responseCsv.status);
                return;
            }

            const csvData = await responseCsv.text();

            const parsedData = Papa.parse(csvData, { header: true, delimiter: ',' });

            if (parsedData.errors.length > 0) {
                console.error('Error parsing CSV:', parsedData.errors);
                parsedData.errors.forEach((error, index) => {
                    console.error(`Parsing Error ${index + 1}:`, error);
                    console.log('Problematic Row:', parsedData.data[error.row[0]]);
                });
                return;
            }

            const header = parsedData.meta.fields;
            const data = parsedData.data;

            console.log('Header:', header);
            console.log('Data:', data);

            // Destroy the previous chart instance
            if (results && results.chartData && results.chartData.destroy) {
                results.chartData.destroy();
            }

            setResults({
                chartData: {
                    labels: data.map((row) => row[header[0]]), // Use "Element" column as labels
                    datasets: [
                        {
                            data: data.map((row) => parseFloat(row[header[1]])), // Use "Concentration" column as data
                            backgroundColor: [
                                '#FF6384',
                                '#36A2EB',
                                '#FFCE56',
                                '#4BC0C0',
                                '#9966FF',
                                '#FF9F40',
                                '#FFD700',
                                '#2E8B57',
                                '#CD853F',
                                '#808080',
                            ],
                        },
                    ],
                },
            });
        } catch (error) {
            console.error('Error fetching or parsing CSV:', error.message);
        }
    };

    useEffect(() => {
        if (uploadSuccess) {
            fetchData();
        }
    }, [uploadSuccess]);

    return (
        <div className={`image-upload-container ${uploadSuccess ? 'success' : ''}`}>
            <header>
                <h1>
                    <animated.span style={shine} className="shining-text">
                        Demeter
                    </animated.span>{' '}
                    Image Uploader
                </h1>
            </header>
            <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                <p>Drag & Drop an image here, or click to select one</p>
            </div>
            {selectedFile && (
                <div className="selected-image-preview">
                    <img src={URL.createObjectURL(selectedFile)} alt="Selected" />
                </div>
            )}
            <button className="upload-button" onClick={handleUpload}>
                {uploadSuccess ? 'Uploaded!' : 'Upload Image'}
            </button>
            {results && (
                <div className="results-container">
                    <h2>Results</h2>
                    {results.chartData && <Pie data={results.chartData} />}
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
