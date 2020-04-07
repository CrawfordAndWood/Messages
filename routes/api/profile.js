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
      user: req.user.id,
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
  [auth, [check("postcode", "Postcode is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { profile } = req.body;

    //Build profile
    const profileFields = {};
    profileFields.user = req.user.id;
    profileFields.addresslineone = req.body.addresslineone;
    profileFields.addresslinetwo = req.body.addresslinetwo;
    profileFields.postcode = req.body.postcode;

    if (profile) profileFields.profile = profile;
    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          {
            new: true,
          }
        );

        return res.json(profile);
      }

      profile = new Profile(profileFields);
      console.log(profileFields);
      console.log(profile);

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
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) return res.status(400).json({ msg: "no profile for user" });

    res.json(profile);
  } catch (err) {
    console.error(err.messge);
    res.status(500).send("Server Error");
  }
});

//@route  DELETE api/profile
//@desc   Delete profile, user & posts
//@access Private
router.delete("/", auth, async (req, res) => {
  try {
    //remove profile
    await Profile.findOneAndRemove({ user: req.user.id });

    //remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User Removed" });
  } catch (err) {
    console.error(err.messge);
    res.status(500).send("Server Error");
  }
});

//@route  PUT api/profile/households
//@desc   ADD profile households
//@access Private
router.get(
  "/households",
  [auth, [check("address", "Address is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.body;
    const newhousehold = { address };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.assignedHouseholds.unshift(newhousehold);
      await profile.save();

      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route  DELETE api/profile/households/:household_id
//@desc   Remove household from user profile
//@access Private
router.delete("/households/:household_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const removeIndex = profile.assignedHouseholds
      .map((item) => item.id)
      .indexOf(req.params.household_id);

    profile.assignedHouseholds.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
