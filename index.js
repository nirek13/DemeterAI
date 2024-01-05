

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');


const app = express();
const port = 5003;

app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

app.use('/uploads', express.static('uploads'));

app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.json({ imageUrl });
});

app.get('/fetch-results', (req, res) => {
    const csvFilePath = '../public/results.csv';
    const results = [];

    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.json(results);
        })
        .on('error', (error) => {
            console.error('Error reading CSV:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
