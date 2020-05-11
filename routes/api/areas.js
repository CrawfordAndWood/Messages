const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator/check");

//middleware
const auth = require("../../middleware/auth");
//services
const AreaService = require("../../services/AreaService");
const areaService = new AreaService();
//models
const Area = require("../../models/Area");

router.get("/count", auth, async (req, res) => {
  try {
    const areaCount = await areaService.countAreas();
    res.json(areaCount);
  } catch (err) {
    console.error(err.messge);
    res.status(500).send("Server Error");
  }
});

router.get("/count/:term", auth, async (req, res) => {
  try {
    const areaCount = await areaService.countAreas(req.params.term);
    res.json(areaCount);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

//@route    GET api/areas/
//@desc     Get area management page
//@access   Private - eventually only global admin has option
router.get("/:page/:limit", auth, async (req, res) => {
  try {
    let areas = await areaService.getAreas(req.params);
    res.json(areas);
  } catch (err) {
    res.status(500).send("Server Error", err);
  }
});

//@route    GET api/area/search
//@desc     Filter area
//@access   Private - eventually only global admin has option
router.get("/:term/:page/:limit", auth, async (req, res) => {
  try {
    let areas = await areaService.getAreas(req.params);

    res.json(areas);
  } catch (err) {
    res.status(500).send("Server Error", err);
  }
});

//@route    POST api//
//@desc     Add or update areas from the management page
//@access   Private - eventually only global admin has option
router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required").not().isEmpty(),
      check("code", "Code is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let createUpdateAreaResult = await areaService.createOrUpdateArea(
        req.body
      );
      if (createUpdateAreaResult.Status === "FAILED") {
        return res
          .status(400)
          .json({ errors: [{ msg: createUpdateAreaResult.Message }] });
      }
      return res.json(createUpdateAreaResult);
    } catch (err) {
      res.status(500).send("Server error", err.message);
    }
  }
);

//@route  DELETE api/areas
//@desc   Delete area
//@access Private
router.delete("/:id/:adminId", auth, async (req, res) => {
  try {
    const result = await areaService.deleteArea(req.params);
    return res.json(result);
  } catch (err) {
    res.status(500).send("Server Error", err.message);
  }
});

module.exports = router;
