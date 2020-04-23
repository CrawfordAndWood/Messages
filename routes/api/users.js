const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");
const auth = require("../../middleware/auth");
const uuid = require("uuid");

const User = require("../../models/User");
const Roles = require("../../models/Roles");

router.get("/user-management/count", auth, async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    res.json(userCount);
  } catch (err) {
    console.error(err.messge);

    res.status(500).send("Server Error");
  }
});

router.get("/user-management/count/:term", auth, async (req, res) => {
  try {
    const sanitisedName = new RegExp(req.params.term, "i");
    const userCount = await User.countDocuments({ name: sanitisedName });
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
    let users = await User.find()
      .skip(Number(req.params.page - 1) * Number(req.params.limit))
      .limit(Number(req.params.limit))
      .sort({ name: 1 });
    //res.json(users);
    const roles = await Roles.find();
    const response = { users, roles };
    res.json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route    GET api/user/search
//@desc     Filter user
//@access   Private - eventually only global admin has option
router.get("/user-management/:term/:page/:limit", auth, async (req, res) => {
  try {
    let searchName = new RegExp(req.params.term, "i");
    const users = await User.find({
      name: searchName,
    })
      .skip(Number(req.params.page - 1) * Number(req.params.limit))
      .limit(Number(req.params.limit))
      .sort({ name: 1 });
    // res.json(users);
    const roles = await Roles.find();
    const response = { users, roles };
    console.log("res", response);
    res.json(response);
  } catch (err) {
    console.error(err.messge);
    res.status(500).send("Server Error");
  }
});

//@route    POST api/user-management/
//@desc     Add or update users from the management page
//@access   Private - eventually only global admin has option
router.post(
  "/user-management",
  [auth, [check("name", "Name is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log("saving user");
    let { id, email, name, postcode, roleId, term, page, limit } = req.body;
    const userFields = { id, email, name, role: roleId, postcode };

    try {
      let searchName = new RegExp(term, "i");
      //check if new user
      if (id === "temp") {
        let user = await User.findOne({ email: email });
        if (user) {
          return res.status(400).json({
            errors: [{ msg: "A User with the same email already exists" }],
          });
        }

        userFields.id = uuid.v4();
        let password = uuid.v4().slice(0, 7);
        const salt = await bcrypt.genSalt(10);
        userFields.password = await bcrypt.hash(password, salt);

        const avatar = gravatar.url(email, {
          s: "200",
          r: "pg",
          d: "mm",
        });
        userFields.avatar = avatar;
        user = new User(userFields);

        await user.save();
        const users = await User.find({ name: searchName })
          .skip(Number(page - 1) * Number(limit))
          .limit(Number(limit));
        const roles = await Roles.find();
        const response = { users, roles };
        res.json(response);
      }

      let user = await User.findOne({ _id: id });
      if (user) {
        console.log("saving edited user", userFields);
        user = await User.findOneAndUpdate(
          { _id: id },
          { $set: userFields },
          {
            new: true,
          }
        );
      }
      const users = await User.find({ name: searchName })
        .skip(Number(page - 1) * Number(limit))
        .limit(Number(limit))
        .sort({ name: 1 });
      const roles = await Roles.find();
      const response = { users, roles };
      res.json(response);

      //check updated user
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
);

//@route  DELETE api/users
//@desc   Delete user
//@access Private
router.delete("/user-management/:id", auth, async (req, res) => {
  try {
    //remove user
    const { id } = req.params;
    await User.findOneAndRemove({ _id: id });
    return res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
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
