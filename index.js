require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
const morgan = require('morgan');
const fs = require('fs');
const data = require('./data.json');

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    return res.status(200).json({
        status: true,
        message: 'test build docker image sendiri!'
    });
});

app.get('/add-data', async (req, res, next) => {
    try {
        const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] }); // big_red_donkey
        data.names.push(randomName);
        fs.writeFileSync('./data.json', JSON.stringify(data));

        return res.status(200).json({
            status: true,
            message: 'berhasil',
            data: randomName
        });
    } catch (err) {
        next(err);
    }
});

app.get('/get-data', async (req, res, next) => {
    try {
        return res.status(200).json({
            status: true,
            message: 'berhasil',
            data: data.names
        });
    } catch (err) {
        next(err);
    }
});

app.listen(PORT, () => console.log('listening on port', PORT));