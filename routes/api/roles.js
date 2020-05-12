const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const uuid = require("uuid");

const Roles = require("../../models/Roles");
const RoleService = require("../../services/RoleService");
const roleService = new RoleService();

router.get("/count", auth, async (req, res) => {
  try {
    const roleCount = await Roles.countDocuments();
    res.json(roleCount);
  } catch (err) {
    console.error(err.messge);

    res.status(500).send("Server Error");
  }
});

router.get("/count/:term", auth, async (req, res) => {
  try {
    const sanitisedName = new RegExp(req.params.term, "i");
    const roleCount = await Roles.countDocuments({ name: sanitisedName });
    res.json(roleCount);
  } catch (err) {
    console.error(err.messge);
    res.status(500).send("Server Error");
  }
});

//@route    GET api/role/
//@desc     Get role management page
//@access   Private - eventually only global admin has option
router.get("/:page/:limit", auth, async (req, res) => {
  try {
    const roles = await Roles.find()
      .skip(Number(req.params.page - 1) * Number(req.params.limit))
      .limit(Number(req.params.limit))
      .sort({ name: 1 });
    res.json(roles);
  } catch (err) {
    console.error(err.messge);
    res.status(500).send("Server Error");
  }
});

//@route    GET api/role/search
//@desc     Filter roles
//@access   Private - eventually only global admin has option
router.get("/:term/:page/:limit", auth, async (req, res) => {
  try {
    let searchName = new RegExp(req.params.term, "i");
    const roles = await Roles.find({
      name: searchName,
    })
      .skip(Number(req.params.page - 1) * Number(req.params.limit))
      .limit(Number(req.params.limit))
      .sort({ name: 1 });
    console.log(roles);
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

    const { id, code, name, term, page, limit } = req.body;
    //Build role
    //APRIL 20 TODO - all requests should have the paging stuff in the body so it can have just one route
    const roleFields = {};
    roleFields.name = name;
    roleFields.code = code;

    try {
      let searchName = new RegExp(term, "i");
      //check if name exists
      let role = await Roles.findOne({
        $and: [{ name: name }, { code: code }],
      });
      if (role) {
        return res.status(400).json({
          errors: [{ msg: "A Role with the same name/code already exists" }],
        });
      }

      //check if new role
      if (id === "temp") {
        roleFields.id = uuid.v4();
        let role = new Roles(roleFields);
        await role.save();
        const roles = await Roles.find({
          $or: [{ name: searchName }, { code: searchName }],
        })
          .skip(Number(page - 1) * Number(limit))
          .limit(Number(limit));
        return res.json(roles);
      }

      //check updated role
      role = await Roles.findOne({ _id: id });
      if (role) {
        role = await Roles.findOneAndUpdate(
          { _id: id },
          { $set: roleFields },
          {
            new: true,
          }
        );
      }
      const roles = await Roles.find({
        $or: [{ name: searchName }, { code: searchName }],
      })
        .skip(Number(page - 1) * Number(limit))
        .limit(Number(limit))
        .sort({ name: 1 });
      return res.json(roles);
    } catch (err) {
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
    return res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
