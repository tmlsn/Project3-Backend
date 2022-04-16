const express = require('express')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('../models/User.model');
const Artist = require('../models/Artist.model');
const { authenticate } = require('../middlewares/jwt.middleware');

const router = express.Router()

router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: passwordHash,
  });
  res.status(200).json(user);
});

router.post('/signup-artist', authenticate, async (req, res) => {
  const { name, style, location } = req.body;

  const artist = await Artist.create({
    createdBy: req.jwtPayload.user._id,
    name,
    style,
    location,
  });
  res.status(200).json(artist);
});

router.post('/signup-venue', authenticate, async (req, res) => {
  const { name, location, style, capacity } = req.body;

  const artist = await Artist.create({
    createdBy: req.jwtPayload.user._id,
    name,
    location,
    style, 
    capacity
  });
  res.status(200).json(artist);
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne( { email })
    if (user) { 
      const passwordCorrect = await bcrypt.compare(password, user.password)
      if (passwordCorrect) {
        const payload = {
          user,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          algorithm: 'HS256',
          expiresIn: '6h'
        });
        res.status(200).json({
          token, 
          user,
        });
      } else {
        res.status(401).send({message: 'Email or password are incorrect'})
      }

  } else {
    res.status(401).send({message: 'Email or password are incorrect'})
  }
    
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router;