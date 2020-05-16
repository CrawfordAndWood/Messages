const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const AreaHistoryService = require("../../services/AreaHistoryService");
const areaHistoryService = new AreaHistoryService();

//@route    GET api/rolehistory
//@desc     RoleHistory
//@access   Public
router.get("/count", auth, async (req, res) => {
  try {
    const areaHistoryCount = await areaHistoryService.countAreaHistoryItems();
    console.log(areaHistoryCount);
    res.json(areaHistoryCount);
  } catch (err) {
    console.error(err.Message);
    res.status(500).send("Server Error");
  }
});

router.get("/count/:term", auth, async (req, res) => {
  try {
    const areaHistoryCount = await areaHistoryService.countAreaHistoryItems(
      req.params.term
    );
    res.json(areaHistoryCount);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

//@route    GET api/areas/
//@desc     Get area management page
//@access   Private - eventually only global admin has option
router.get("/:page/:limit", auth, async (req, res) => {
  try {
    let areaHistory = await areaHistoryService.getAreaHistory(req.params);
    res.json(areaHistory);
  } catch (err) {
    res.status(500).send("Server Error", err);
  }
});

//@route    GET api/area/search
//@desc     Filter area
//@access   Private - eventually only global admin has option
router.get("/:term/:page/:limit", auth, async (req, res) => {
  try {
    let areaHistory = await areaHistoryService.getAreaHistory(req.params);
    res.json(areaHistory);
  } catch (err) {
    res.status(500).send("Server Error", err);
  }
});
module.exports = router;
