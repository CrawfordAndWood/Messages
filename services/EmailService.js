const nodemailer = require("nodemailer");
const EmailTemplates = require("../constants/emailTemplates");

function EmailService(templateFields) {
  this.fields = new EmailTemplates(templateFields);
}

EmailService.prototype.sendEmail = function () {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "woodliam003@gmail.com",
      pass: "B1tch1nn",
    },
  });

  var mailOptions = {
    from: "woodliam003@gmail.com",
    to: "woodliam003@gmail.com",
    subject: "Sending Email using Node.js",
    html: this.fields.message,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent but shouldn't be: " + info.response);
    }
  });
};

module.exports = EmailService;
