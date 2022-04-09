const express = require('express')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('../models/User.model')

const router = express.Router()

router.post('/signup', async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({
    firstname,
    lastname,
    email,
    password: passwordHash,
  });
  res.status(200).json(user);
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