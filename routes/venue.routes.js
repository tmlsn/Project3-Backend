const express = require("express");
const { authenticate } = require('../middlewares/jwt.middleware');
const User = require("../models/User.model");
const Artist = require('../models/Artist.model')
const Venue = require('../models/Venue.model');

const router = express.Router()

router.get("/all", authenticate, async (req, res) => {
  const { user } = req.jwtPayload.user._id
  const allVenues = await Venue.find();
  res.status(200).json(allVenues);
});


module.exports = router;
