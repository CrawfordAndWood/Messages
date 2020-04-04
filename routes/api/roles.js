const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");

const Roles = require("../../models/Roles");

//what are some requirements?
//only a global admin can create and edit sys roles
//get - returns all roles in db

//@route    GET api/role/
//@desc     Get role management page
//@access   Private - eventually only global admin has option
router.get("/", auth, async (req, res) => {
  try {
    const roles = await Roles.find();
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

    const { name } = req.body;
    //Build role
    const roleFields = {};
    roleFields.name = name;
    console.log("rolen", roleFields);

    try {
      let role = await Roles.findOne({ role: name });
      console.log("rolen", role);
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

      role = new Roles(roleFields);
      console.log("fi", roleFields);
      console.log("ro", role);

      await role.save();
      res.json(role);
    } catch (err) {
      console.error("error me", err);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
