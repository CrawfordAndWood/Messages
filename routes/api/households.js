/*Built off of households. Replace household with your type */

const express = require("express");
const router = express.Router();
const config = require("config");
const { check, validationResult } = require("express-validator/check");

//middleware
const auth = require("../../middleware/auth");
//services
const HouseholdService = require("../../services/HouseholdService");
const householdService = new HouseholdService();
//models

router.get("/count", auth, async (req, res) => {
  try {
    const householdCount = await householdService.countHouseholds();
    res.json(householdCount);
  } catch (err) {
    console.error(err.Message);
    res.status(500).send("Server Error");
  }
});

router.get("/count/:term", auth, async (req, res) => {
  try {
    const householdCount = await householdService.countHouseholds(
      req.params.term
    );
    res.json(householdCount);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

//@route    GET api/households/
//@desc     Get household management page
//@access   Private - eventually only global admin has option
router.get("/:page/:limit", auth, async (req, res) => {
  try {
    let households = await householdService.getHouseholds(req.params);
    res.json(households);
  } catch (err) {
    res.status(500).send("Server Error", err);
  }
});

//@route    GET api/household/search
//@desc     Filter household
//@access   Private - eventually only global admin has option
router.get("/:term/:page/:limit", auth, async (req, res) => {
  try {
    let households = await householdService.getHouseholds(req.params);

    res.json(households);
  } catch (err) {
    res.status(500).send("Server Error", err);
  }
});

//@route    POST api//
//@desc     Add or update households from the management page
//@access   Private - eventually only global admin has option
router.post(
  "/",
  [
    auth,
    [
      check("street", "Street is required").not().isEmpty(),
      check("house", "House is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let createUpdateHouseholdResult = await householdService.createOrUpdateHousehold(
        req.body
      );
      if (createUpdateHouseholdResult.Status === "FAILED") {
        return res
          .status(400)
          .json({ errors: [{ msg: createUpdateHouseholdResult.Message }] });
      }
      return res.json(createUpdateHouseholdResult);
    } catch (err) {
      res.status(500).send("Server error", err.message);
    }
  }
);

//@route  DELETE api/households
//@desc   Delete household
//@access Private
router.delete("/:id/:adminId", auth, async (req, res) => {
  try {
    const result = await householdService.deleteHousehold(req.params);
    return res.json(result);
  } catch (err) {
    res.status(500).send("Server Error", err.message);
  }
});

module.exports = router;
