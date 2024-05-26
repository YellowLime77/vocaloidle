const mongoose = require('mongoose');
const { Schema } = mongoose;

const songSchema = new Schema({
    producer: String,
    jp: String,
    romaji: String,
    en: String,
    yt: String,
    imageFileId: { type: mongoose.Types.ObjectId, required: true },
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;