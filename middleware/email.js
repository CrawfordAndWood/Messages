const Verifier = require("email-verifier");

module.exports = async function (req, res, next) {
  try {
    console.log(req.body);

    const email = req.body.email;
    const verifier = new Verifier("at_mjYA2Go5hGm9iaiqkcdy0MhSJSgY5");
    await verifier.verify(email, (err, data) => {
      if (data.smtpCheck === "false") {
        {
          console.log("its false");
          return res.status(400).json({
            errors: [{ msg: email + " is not a valid email address" }],
          });
        }
      } else {
        next();
      }
    });
  } catch (err) {
    res.status(401).json({ msg: err.message });
  }
};
