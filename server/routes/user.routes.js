const express = require('express');
const router = express.Router();
const User = require('../user.schema');
const auth = require("../middleware/auth.middleware");

router.get('/',async (req,res) => {
  try {
    console.log(req.body);
    // const users = await User.find({ owner: req.user.userId });
    // res.json(users);
  } catch (e) {
    res.status(500).json({message: `Something went terribly wrong: ${e}`})
  }
  res.send()
});

module.exports = router;