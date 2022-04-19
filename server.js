const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require('dotenv')
dotenv.config()
const { authenticate } = require("./middlewares/jwt.middleware");

mongoose.connect(process.env.MONGO_DB_URL);

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello world')
})

const authRoutes = require("./routes/auth.routes");
app.use('/auth', authRoutes); 

const postRoutes = require("./routes/post.routes");
app.use('/post', authenticate, postRoutes);

app.listen(process.env.PORT);