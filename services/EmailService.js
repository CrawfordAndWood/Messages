const nodemailer = require("nodemailer");
const EmailTemplates = require("../constants/emailTemplates");

class EmailService {
  constructor(templateFields) {
    this.fields = new EmailTemplates(templateFields);
  }
  async sendEmail() {
    var transporter = nodemailer.createTransport({
      //service: "gmail",
      host: "smtp.ethereal.email",
      auth: {
        user: "jamal.huels14@ethereal.email",
        pass: "VpCufWA9hpbJZckvsa",
      },
    });
    var mailOptions = {
      from: "admin@messages.com",
      to: this.fields.to,
      subject: this.fields.subject,
      html: this.fields.message,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
}

module.exports = EmailService;
