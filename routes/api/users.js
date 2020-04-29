const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");
const UserService = require("../../services/UserService");
const userService = new UserService();
const User = require("../../models/User");

router.get("/user-management/count", auth, async (req, res) => {
  try {
    const userCount = await userService.countUsers();
    res.json(userCount);
  } catch (err) {
    console.error(err.messge);
    res.status(500).send("Server Error");
  }
});

router.get("/user-management/count/:term", auth, async (req, res) => {
  try {
    const userCount = await userService.countUsers(req.params.term);
    res.json(userCount);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

//@route    GET api/users/
//@desc     Get user management page
//@access   Private - eventually only global admin has option
router.get("/user-management/:page/:limit", auth, async (req, res) => {
  try {
    let users = await userService.getUsers(req.params);
    res.json(users);
  } catch (err) {
    res.status(500).send("Server Error", err);
  }
});

//@route    GET api/user/search
//@desc     Filter user
//@access   Private - eventually only global admin has option
router.get("/user-management/:term/:page/:limit", auth, async (req, res) => {
  try {
    let users = await userService.getUsers(req.params);
    res.json(users);
  } catch (err) {
    res.status(500).send("Server Error", err);
  }
});

//@route    POST api/user-management/
//@desc     Add or update users from the management page
//@access   Private - eventually only global admin has option
router.post(
  "/user-management",
  [
    auth,
    [
      check("name", "Name is required").not().isEmpty(),
      check("email", "Please include a valid email").isEmail(),
      check("postcode", "Postcode is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let createUpdateUserResult = await userService.createOrUpdateUser(
        req.body
      );
      if (createUpdateUserResult.Status === "FAILED") {
        return res
          .status(400)
          .json({ errors: [{ msg: createUpdateUserResult.Message }] });
      }
      return res.json(createUpdateUserResult);
    } catch (err) {
      res.status(500).send("Server error", err.message);
    }
  }
);

//@route  DELETE api/users
//@desc   Delete user
//@access Private
router.delete("/user-management/:id", auth, async (req, res) => {
  try {
    const result = userService.deleteUser(req.params);
    return res.json(result);
  } catch (err) {
    res.status(500).send("Server Error", err.message);
  }
});

//@route    POST api/users
//@desc     Register a New User from the Registration page. May be deprecated.
//@access   Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("postcode", "Postcode is required").not().isEmpty(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, postcode, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      //get gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        name,
        email,
        postcode,
        avatar,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      const payload = {
        user: {
          id: user.id,
        },
      };

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

module.exports = router;
