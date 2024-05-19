const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const songRoutes = require('./routes/songRoutes');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://yourMongoDBURI', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/songs', songRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});