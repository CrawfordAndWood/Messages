const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const HouseholdHistoryService = require("../../services/HouseholdHistoryService");
const householdHistoryService = new HouseholdHistoryService();

//@route    GET api/rolehistory
//@desc     RoleHistory
//@access   Public
router.get("/count", auth, async (req, res) => {
  try {
    const householdHistoryCount = await householdHistoryService.countHouseholdHistoryItems();
    console.log(householdHistoryCount);
    res.json(householdHistoryCount);
  } catch (err) {
    console.error(err.Message);
    res.status(500).send("Server Error");
  }
});

router.get("/count/:term", auth, async (req, res) => {
  try {
    const householdHistoryCount = await householdHistoryService.countHouseholdHistoryItems(
      req.params.term
    );
    res.json(householdHistoryCount);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

//@route    GET api/households/
//@desc     Get household management page
//@access   Private - eventually only global admin has option
router.get("/:page/:limit", auth, async (req, res) => {
  try {
    let householdHistory = await householdHistoryService.getHouseholdHistory(
      req.params
    );
    res.json(householdHistory);
  } catch (err) {
    res.status(500).send("Server Error", err);
  }
});

//@route    GET api/household/search
//@desc     Filter household
//@access   Private - eventually only global admin has option
router.get("/:term/:page/:limit", auth, async (req, res) => {
  try {
    let householdHistory = await householdHistoryService.getHouseholdHistory(
      req.params
    );
    res.json(householdHistory);
  } catch (err) {
    res.status(500).send("Server Error", err);
  }
});
module.exports = router;
