const express = require("express");
const axios = require("axios")

const router = express.Router()

router.get("/concerts", async (req, res) => {
  let apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${process.env.TM_CONSUMER_KEY}&keyword=barcelona`
  const concerts = await axios.get(apiUrl)
  console.log(concerts.data._embedded)
  res.status(200).json(concerts.data._embedded)
});




module.exports = router;
