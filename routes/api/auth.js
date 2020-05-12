const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");

//Service imports
const UserHistoryService = require("../../services/UserHistoryService");
const userHistoryService = new UserHistoryService();
//model imports
const User = require("../../models/User");
const Role = require("../../models/Roles");

//@route    GET api/auth
//@desc     Test route
//@access   Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id })
      .populate("role")
      .select("-password");
    console.log("user", user);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route    POST api/auth
//@desc     Authenticate user & get token
//@access   Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      //add to history
      let userHistoryFields = {
        description: "User signed in",
        updatedBy: null,
        user: user.id,
        date: new Date(),
      };
      await userHistoryService.addUserHistory(userHistoryFields);

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server error");
    }
  }
);

//@route    GET api/auth
//@desc     Test route
//@access   Public
router.post("/logout", auth, async (req, res) => {
  try {
    const { activeUserId } = req.body;

    let userHistoryFields = {
      description: "User signed out",
      updatedBy: null,
      user: activeUserId,
      date: new Date(),
    };
    await userHistoryService.addUserHistory(userHistoryFields);
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
