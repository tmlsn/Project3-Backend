const express = require('express')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('../models/User.model');
const Artist = require('../models/Artist.model');
const { authenticate } = require('../middlewares/jwt.middleware');
const Venue = require('../models/Venue.model');

const router = express.Router()

router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password, details } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: passwordHash,
    details,
  });
  res.status(200).json(user);
});

router.post('/signup-details', authenticate, async (req, res) => {
  

  res.status(200).json('ok');
});

router.post('/signup-artist', authenticate, async (req, res) => {
  const { name, style, description, contactInfo, location } = req.body;

  const artist = await Artist.create({
    createdBy: req.jwtPayload.user._id,
    name,
    style,
    description,
    contactInfo,
    location,
  });
  res.status(200).json(artist);
});

router.post('/signup-venue', authenticate, async (req, res) => {
  const { name, description, location, contactInfo, capacity } = req.body;

  const venue = await Venue.create({
    createdBy: req.jwtPayload.user._id,
    name,
    description, 
    location,
    contactInfo,
    capacity
  });
  res.status(200).json(venue);
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

router.get('/verify', authenticate, (req, res) => {
  res.status(200).json({
    user: req.jwtPayload.user
  })
})

module.exports = router;