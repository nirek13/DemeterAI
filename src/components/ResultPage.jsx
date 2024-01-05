// ResultPage.js
import React from 'react';

const ResultPage = () => {
    // You can fetch the organism details, taxonomical classifications,
    // and recommended soil treatments from your backend API and display them here.

    // For demonstration purposes, I'll display some placeholder information.
    const organismDetails = [
        { name: 'Organism A', classification: 'Class A', treatment: 'Treatment A' },
        { name: 'Organism B', classification: 'Class B', treatment: 'Treatment B' },
        // Add more organisms as needed
    ];

    return (
        <div className="result-page">
            <h2>Organisms Present</h2>
            <ul>
                {organismDetails.map((organism, index) => (
                    <li key={index}>
                        <strong>Name:</strong> {organism.name},&nbsp;
                        <strong>Classification:</strong> {organism.classification},&nbsp;
                        <strong>Treatment:</strong> {organism.treatment}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ResultPage;
