const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const Song = require('../models/song');

const mongoose = require('mongoose');
const { MongoClient, GridFSBucket } = require('mongodb');
const { Types } = require('mongoose');
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

router.post('/upload', upload.fields([{ name: 'audio' }, { name: 'image' }]), async (req, res) => {
    console.log("uploading song...");
    try {
        const { producer, en, jp, romaji, spotify, yt, apple } = req.body;

        if (!req.files['audio'] || !req.files['image']) {
            return res.status(400).send({ error: 'Audio or image file is missing' });
        }

        const audioFileId = req.files['audio'][0].id;
        const imageFileId = req.files['image'][0].id;

        const newSong = new Song({
        producer,
        en,
        jp,
        romaji,
        spotify,
        yt,
        apple,
        audioFileId,
        imageFileId
        });

        await newSong.save();

        res.status(201).send(newSong);
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: 'Error uploading files or saving song metadata' });
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

        const downloadStream = bucket.openDownloadStream(new Types.ObjectId(song.audioFileId.toString()));
        downloadStream.pipe(res);
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: 'Error fetching audio file' });
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