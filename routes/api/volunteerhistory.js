const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const VolunteerHistoryService = require("../../services/VolunteerHistoryService");
const volunteerHistoryService = new VolunteerHistoryService();

//@route    GET api/rolehistory
//@desc     RoleHistory
//@access   Public
router.get("/count", auth, async (req, res) => {
  try {
    const volunteerHistoryCount = await volunteerHistoryService.countVolunteerHistoryItems();
    console.log(volunteerHistoryCount);
    res.json(volunteerHistoryCount);
  } catch (err) {
    console.error(err.Message);
    res.status(500).send("Server Error");
  }
});

router.get("/count/:term", auth, async (req, res) => {
  try {
    const volunteerHistoryCount = await volunteerHistoryService.countVolunteerHistoryItems(
      req.params.term
    );
    res.json(volunteerHistoryCount);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

//@route    GET api/volunteers/
//@desc     Get volunteer management page
//@access   Private - eventually only global admin has option
router.get("/:page/:limit", auth, async (req, res) => {
  try {
    let volunteerHistory = await volunteerHistoryService.getVolunteerHistory(
      req.params
    );
    res.json(volunteerHistory);
  } catch (err) {
    res.status(500).send("Server Error", err);
  }
});

//@route    GET api/volunteer/search
//@desc     Filter volunteer
//@access   Private - eventually only global admin has option
router.get("/:term/:page/:limit", auth, async (req, res) => {
  try {
    let volunteerHistory = await volunteerHistoryService.getVolunteerHistory(
      req.params
    );
    res.json(volunteerHistory);
  } catch (err) {
    res.status(500).send("Server Error", err);
  }
});
module.exports = router;
