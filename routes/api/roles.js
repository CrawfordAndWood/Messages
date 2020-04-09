const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const uuid = require("uuid");

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
  [auth, [check("name", "Name is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, name } = req.body;
    //Build role
    const roleFields = {};
    roleFields.name = name;

    try {
      if (id === 0) {
        roleFields.id = uuid.v4();
        let role = new Roles(roleFields);
        await role.save();
      } else {
        let role = await Roles.findOne({ _id: id });
        if (role) {
          role = await Roles.findOneAndUpdate(
            { _id: id },
            { $set: roleFields },
            {
              new: true,
            }
          );
        }
      }
      const roles = await Roles.find();

      return res.json(roles);
    } catch (err) {
      console.error("error me", err);
      res.status(500).send("Server error");
    }
  }
);

//@route  DELETE api/roles
//@desc   Delete role
//@access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    //remove role
    const { id } = req.params;
    await Roles.findOneAndRemove({ _id: id });

    const roles = await Roles.find();
    console.log("worked", roles);

    return res.json(roles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
