const express = require("express");
const axios = require("axios")

const router = express.Router()

router.get("/:geohash", async (req, res) => {
  try {
    const { geohash } = req.params;
    let apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${process.env.TM_CONSUMER_KEY}&keyword=music&geoPoint=${geohash}&radius=10`
    const concerts = await axios.get(apiUrl)
    res.status(200).json(concerts.data._embedded)
    
  } catch (error) {
    res.status(404).json(error)
  }
});



module.exports = router;
