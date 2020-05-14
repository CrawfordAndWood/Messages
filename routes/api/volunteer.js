const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator/check");

//middleware
const auth = require("../../middleware/auth");
//services
const VolunteerService = require("../../services/VolunteerService");
const volunteerService = new VolunteerService();
//models
const Volunteer = require("../../models/Volunteer");

router.get("/count/:areaId", auth, async (req, res) => {
  try {
    const volunteerCount = await volunteerService.countVolunteers(
      req.params.areaId
    );
    res.json(volunteerCount);
  } catch (err) {
    console.error(err.messge);
    res.status(500).send("Server Error");
  }
});

router.get("/count/:areaId/:term", auth, async (req, res) => {
  try {
    const volunteerCount = await volunteerService.countVolunteers(
      req.params.areaId,
      req.params.term
    );
    res.json(volunteerCount);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

//@route    GET api/volunteers/
//@desc     Get volunteer management page
//@access   Private - eventually only global admin has option
router.get("/:areaId/:page/:limit", auth, async (req, res) => {
  try {
    let volunteers = await volunteerService.getVolunteers(req.params);
    res.json(volunteers);
  } catch (err) {
    res.status(500).send("Server Error", err);
  }
});

//@route    GET api/volunteer/search
//@desc     Filter volunteer
//@access   Private - eventually only global admin has option
router.get("/:areaId/:term/:page/:limit", auth, async (req, res) => {
  try {
    let volunteers = await volunteerService.getVolunteers(req.params);

    res.json(volunteers);
  } catch (err) {
    res.status(500).send("Server Error", err);
  }
});

//@route    POST api//
//@desc     Add or update volunteers from the management page
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
      let createUpdateVolunteerResult = await volunteerService.createOrUpdateVolunteer(
        req.body
      );
      if (createUpdateVolunteerResult.Status === "FAILED") {
        return res
          .status(400)
          .json({ errors: [{ msg: createUpdateVolunteerResult.Message }] });
      }
      return res.json(createUpdateVolunteerResult);
    } catch (err) {
      res.status(500).send("Server error", err.message);
    }
  }
);

//@route  DELETE api/volunteers
//@desc   Delete volunteer
//@access Private
router.delete("/:id/:adminId", auth, async (req, res) => {
  try {
    const result = await volunteerService.deleteVolunteer(req.params);
    return res.json(result);
  } catch (err) {
    res.status(500).send("Server Error", err.message);
  }
});

module.exports = router;
