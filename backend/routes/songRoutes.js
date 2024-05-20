const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const Song = require('../models/song');

const mongoose = require('mongoose');
const { MongoClient, GridFSBucket } = require('mongodb');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

router.post('/upload', upload.fields([{ name: 'audio' }, { name: 'image' }]), async (req, res) => {
    console.log("uploading song...");
    try {
    const { producer, en, jp, romaji, spotify, yt, apple } = req.body;
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

        const songOnlyNeeded = {
            producer: song.producer,
            en: song.en,
            jp: song.jp,
            romaji: song.romaji
        };

        res.status(200).send(songOnlyNeeded);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching song' });
    }
});

router.get('/audio/:id', async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        const bucket = new GridFSBucket(connection.db, {
            bucketName: 'uploads'
        });
        const objectId = new mongoose.Types.ObjectId(song.audioFileId);
        const downloadStream = bucket.openDownloadStream(objectId);
        downloadStream.pipe(res);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching audio' });
    }
});

module.exports = router;