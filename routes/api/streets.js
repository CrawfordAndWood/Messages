const express = require("express");
const router = express.Router();

//@route    GET api/streets
//@desc     Test route
//@access   Public
router.get("/", (req, res) => res.send("streets route"));

module.exports = router;
