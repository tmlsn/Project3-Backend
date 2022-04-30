const express = require("express");
const { authenticate } = require('../middlewares/jwt.middleware');
const User = require("../models/User.model");
const Artist = require('../models/Artist.model')
const Venue = require('../models/Venue.model');
const { findById } = require("../models/User.model");


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

router.put("/artist/edit/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const { name, style, description, contactInfo, location } = req.body;
  const user  = req.jwtPayload.user._id
  let artist = await Artist.findOne({createdBy: id});
  if (artist.createdBy.toString() === req.jwtPayload.user._id) {
    artist.name = name;
    artist.style = style;
    artist.description = description
    artist.contactInfo = contactInfo
    artist.location = location
    artist = await artist.save();
    res.status(200).json(artist);
  } else {
    res.status(400).json("unauthorized");
  }
});

router.put("/venue/edit/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  const { name, location, description, contactInfo, capacity } = req.body;
  const user  = req.jwtPayload.user._id
  let venue = await Venue.findOne({createdBy: id});
  if (venue.createdBy.toString() === req.jwtPayload.user._id) {
    venue.name = name;
    venue.location = location;
    venue.description = description
    venue.contactInfo = contactInfo
    venue.capacity = capacity
    venue = await venue.save();
    res.status(200).json(venue);
  } else {
    res.status(400).json("unauthorized");
  }
});

router.put("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { details } = req.body
    let user = await User.findById(id)
    user.details = details
    user = await user.save()
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json("unauthorized");
  }
})



module.exports = router;
