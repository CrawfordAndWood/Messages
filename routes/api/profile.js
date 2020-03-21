const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");

const Profile = require("../../models/Profile");
const User = require("../../models/User");
//@route    GET api/profile/me
//@desc     Get current user's profile
//@access   Private

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "No User Profile exists" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.messge);
    res.status(500).send("Server Error");
  }
});

//@route    POST api/profile
//@desc     Create or update user profile
//@access   Private

router.post(
  "/",
  [
    auth,
    [
      check("role", "Role is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { role } = req.body;

    //Build profile
    const profileFields = {};
    profileFields.user = req.user.id;
    if (role) profileFields.role = role;
    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          {
            new: true
          }
        );

        return res.json(profile);
      }

      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.messge);
      res.status(500).send("Server error");
    }
  }
);

//@route  GET api/profile
//@desc   Get all profiles
//@access Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.messge);
    res.status(500).send("Server Error");
  }
});

//@route  GET api/profile/user/:user_id
//@desc   Get profile by user id
//@access Public
router.get("/user/:user_id", async (req, res) => {
  try {
    console.log("finding user", req.params.user_id);
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name", "avatar"]);

    if (!profile) return res.status(400).json({ msg: "no profile for user" });

    res.json(profile);
  } catch (err) {
    console.error(err.messge);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
