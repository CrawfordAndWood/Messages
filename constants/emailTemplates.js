function EmailTemplates(options) {
  this.selectedTemplate = options.selectedTemplate;
  this.NEW_ACCOUNT_MESSAGE =
    `<h2>Hello ` +
    options.name +
    `,</h2> 
      <p>Welcome to Messages. A new account has been setup for you. </p>
      <p>Your Username is ` +
    options.email +
    `</p>
      <p>Your password is ` +
    options.password +
    ` </p>`;
  this.message = this.configureEmail();
}

EmailTemplates.prototype.configureEmail = function () {
  switch (this.selectedTemplate) {
    case "NEW_ACCOUNT_MESSAGE":
      return this.NEW_ACCOUNT_MESSAGE;
    default:
      return null;
  }
};

module.exports = EmailTemplates;
