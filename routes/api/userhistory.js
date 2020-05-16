const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const UserHistoryService = require("../../services/UserHistoryService");
const userHistoryService = new UserHistoryService();

//@route    GET api/rolehistory
//@desc     RoleHistory
//@access   Public
router.get("/count", auth, async (req, res) => {
  try {
    const userHistoryCount = await userHistoryService.countUserHistoryItems();
    console.log(userHistoryCount);
    res.json(userHistoryCount);
  } catch (err) {
    console.error(err.Message);
    res.status(500).send("Server Error");
  }
});

router.get("/count/:term", auth, async (req, res) => {
  try {
    const userHistoryCount = await userHistoryService.countUserHistoryItems(
      req.params.term
    );
    res.json(userHistoryCount);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

//@route    GET api/users/
//@desc     Get user management page
//@access   Private - eventually only global admin has option
router.get("/:page/:limit", auth, async (req, res) => {
  try {
    let userHistory = await userHistoryService.getUserHistory(req.params);
    res.json(userHistory);
  } catch (err) {
    res.status(500).send("Server Error", err);
  }
});

//@route    GET api/user/search
//@desc     Filter user
//@access   Private - eventually only global admin has option
router.get("/:term/:page/:limit", auth, async (req, res) => {
  try {
    let userHistory = await userHistoryService.getUserHistory(req.params);
    res.json(userHistory);
  } catch (err) {
    res.status(500).send("Server Error", err);
  }
});
module.exports = router;
