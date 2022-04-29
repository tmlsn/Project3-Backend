const express = require("express");
const { authenticate } = require('../middlewares/jwt.middleware');
const User = require("../models/User.model");
const Artist = require('../models/Artist.model')
const Venue = require('../models/Venue.model')


const router = express.Router()

router.get("/artist/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const artist = await Artist.findOne({createdBy: id})
    res.status(200).json(artist);
  } catch (error) {
    res.status(404).json(error)
  }
});

router.get("/venue/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const venue = await Venue.findOne({createdBy: id})
    res.status(200).json(venue);
  } catch (error) {
    res.status(404).json(error)
  }
});



module.exports = router;
