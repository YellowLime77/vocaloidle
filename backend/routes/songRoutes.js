const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const Song = require('../models/song');

router.post('/upload', upload.fields([{ name: 'audio' }, { name: 'image' }]), async (req, res) => {
  try {
    const { producer, jp, romaji, en, spotify, yt, apple } = req.body;
    const audioFileId = req.files['audio'][0].id;
    const imageFileId = req.files['image'][0].id;

    const newSong = new Song({
      producer,
      jp,
      romaji,
      en,
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

module.exports = router;