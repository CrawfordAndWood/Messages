const express = require("express");
const router = express.Router();

//@route    GET api/inventory
//@desc     Test route
//@access   Public
router.get("/", (req, res) => res.send("inventory route"));

module.exports = router;
