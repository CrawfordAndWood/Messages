const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");

const Role = require("../../models/Role");

//what are some requirements?
//only a global admin can create and edit sys roles
//get - returns all roles in db

//@route    GET api/role/
//@desc     Get role management page
//@access   Private - eventually only global admin has option
router.get("/", auth, async (req, res) => {
  try {
    const roles = await Role.find({}).populate("role", ["name"]);
    res.json(roles);
  } catch (err) {
    console.error(err.messge);
    res.status(500).send("Server Error");
  }
});

//@route    POST api/role/
//@desc     Add new role
//@access   Private - eventually only global admin has option
router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required")
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

    //Build role
    const roleFields = {};
    roleFields.name = req.body.name;

    try {
      let role = await Role.findOne({ role: req.role.id });
      if (role) {
        role = await Role.findOneAndUpdate(
          { role: req.role.id },
          { $set: roleFields },
          {
            new: true
          }
        );

        return res.json(role);
      }

      role = new Profile(roleFields);
      console.log(roleFields);
      console.log(role);

      await role.save();
      res.json(role);
    } catch (err) {
      console.error(err.messge);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
