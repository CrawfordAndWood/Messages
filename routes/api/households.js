const express = require("express");
const router = express.Router();

//@route    GET api/households
//@desc     Test route
//@access   Public
router.get("/", (req, res) => res.send("households route"));

module.exports = router;
