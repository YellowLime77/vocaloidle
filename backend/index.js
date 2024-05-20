const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const songRoutes = require('./routes/songRoutes');

const app = express();
app.use(express.json());
app.use(cors());

require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
}
);

app.use('/songs', songRoutes);

app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});