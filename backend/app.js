const express = require('express');
const mongoose = require('mongoose');
const songRouter = require('./routes/songRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
const cors = require("cors");

app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/musicDB');

app.use('/songs', songRouter);
 
const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
