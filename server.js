const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require('dotenv')
dotenv.config()

mongoose.connect(process.env.MONGO_DB_URL);

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello world')
})

const authRoutes = require("./routes/auth.routes");
app.use('/auth', authRoutes); 

app.listen(process.env.PORT);