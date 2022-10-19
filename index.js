require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const { User } = require('./models');
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
const morgan = require('morgan');

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

        const user = await User.create({
            name: randomName
        });

        return res.status(200).json({
            status: true,
            message: 'berhasil',
            data: user.name
        });
    } catch (err) {
        next(err);
    }
});

app.get('/get-data', async (req, res, next) => {
    try {
        const user = await User.findAll();

        return res.status(200).json({
            status: true,
            message: 'berhasil',
            data: user
        });
    } catch (err) {
        next(err);
    }
});

app.listen(PORT, () => console.log('listening on port', PORT));