const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const Song = require('../models/song');

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
        let songsOnlyNeeded = songs.map(song => {
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

module.exports = router;