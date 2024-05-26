const express = require('express');
const router = express.Router();
const Song = require('../models/song');

const mongoose = require('mongoose');
const { MongoClient, GridFSBucket } = require('mongodb');
const { Types } = require('mongoose');
const streamifier = require('streamifier');
const stream = require('youtube-audio-stream')

const multer = require('multer');
const upload = multer();

require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

let bucket;
connection.once('open', () => {
    bucket = new GridFSBucket(connection.db, {
        bucketName: 'uploads'
    });
});

// form-data
// request contains:
// producer, en, jp, romaji, spotify, yt, apple
// and two files: audio and image
// uploads to gridfs
router.post('/upload', upload.fields([{ name: 'image', maxCount: 1 }]), async (req, res) => {
    try {
        const { producer, en, jp, romaji, yt } = req.body;

        const imageFile = req.files.image[0];

        const imageUploadStream = bucket.openUploadStream(imageFile.originalname);

        const imageFileId = imageUploadStream.id;

        streamifier.createReadStream(imageFile.buffer).pipe(imageUploadStream);

        audioUploadStream.on('finish', async () => {
            const song = new Song({
                producer,
                en,
                jp,
                romaji,
                yt,
                imageFileId
            });

            await song.save();
            res.status(201).send({ message: 'Song uploaded successfully' });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error uploading song' });
    }
});

router.get('/list', async (req, res) => {
    try {
        const songs = await Song.find();
        const songsOnlyNeeded = songs.map(song => {
            return {
                producer: song.producer,
                en: song.en,
                jp: song.jp,
                romaji: song.romaji
            };
        });

        res.status(200).send(songsOnlyNeeded);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching songs' });
    }
});

// get random
router.get('/random', async (req, res) => {
    try {
        const count = await Song.countDocuments();
        const random = Math.floor(Math.random() * count);
        const song = await Song.findOne().skip(random);

        res.status(200).send(song);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching song' });
    }
});

router.get('/audio/:id', async (req, res) => {
    try {
        let song = await Song.findById(req.params.id);

        const resStream = stream(song.yt)
        resStream.pipe(res)
    } catch (error) {
        console.log(error)
        res.writeHead(500)
        res.end('Error fetching audio')
    }
});

router.get('/image/:id', async (req, res) => {
    try {
        let song = await Song.findById(req.params.id);

        const downloadStream = bucket.openDownloadStream(new Types.ObjectId(song.imageFileId.toString()));
        downloadStream.pipe(res);
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: 'Error fetching image file' });
    }
});

module.exports = router;