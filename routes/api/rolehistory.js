const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");

//@route    GET api/rolehistory
//@desc     RoleHistory
//@access   Public
router.get("/count", auth, async (req, res) => {
  try {
    const roleHistoryCount = await roleHistoryService.countRoleHistoryItems();
    res.json(roleHistoryCount);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/count/:term", auth, async (req, res) => {
  try {
    const roleHistoryCount = await roleHistoryService.countRoleHistoryItems(
      req.params.term
    );
    res.json(roleHistoryCount);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

//@route    GET api/users/
//@desc     Get user management page
//@access   Private - eventually only global admin has option
router.get("/:page/:limit", auth, async (req, res) => {
  try {
    let roleHistory = await roleHistoryService.getRoleHistory(req.params);
    res.json(roleHistory);
  } catch (err) {
    res.status(500).send("Server Error", err);
  }
});

//@route    GET api/user/search
//@desc     Filter user
//@access   Private - eventually only global admin has option
router.get("/:term/:page/:limit", auth, async (req, res) => {
  try {
    let roleHistory = await roleHistoryService.getRoleHistory(req.params);
    res.json(roleHistory);
  } catch (err) {
    res.status(500).send("Server Error", err);
  }
});
module.exports = router;
