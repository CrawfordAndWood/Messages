const EmailService = require("../services/EmailService");
const User = require("../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");

function UserService() {}

/*Count Users */
UserService.prototype.countUsers = async function (term = null) {
  if (term === null) {
    const userCount = await User.countDocuments();
    return userCount;
  }
  const regTerm = new RegExp(term, "i");
  const userCount = await User.countDocuments({
    $or: [{ name: regTerm }, { email: regTerm }, { postcode: regTerm }],
  });
  return userCount;
};

/*Get Users*/
UserService.prototype.getUsers = async function (params) {
  if (params.term === undefined) {
    let users = await User.find()
      .skip(Number(params.page - 1) * Number(params.limit))
      .select("-password")
      .limit(Number(params.limit));
    return users;
  }

  let term = new RegExp(params.term, "i");
  let users = await User.find({
    $or: [{ name: term }, { email: term }, { postcode: term }],
  })
    .skip(Number(params.page - 1) * Number(params.limit))
    .select("-password")
    .limit(Number(params.limit));
  return users;
};

/*Create User*/
UserService.prototype.createUser = async function (newUserRequestArgs) {
  let user = await User.findOne({ email: newUserRequestArgs.email });
  if (user) {
    user.Status = "FAILED";
    user.Message = "A User with the same email already exists";
    return user;
  }
  let { id, email, name, postcode, roleId } = newUserRequestArgs;

  const userFields = { id, email, name, role: roleId, postcode };
  userFields.id = uuid.v4();
  let password = uuid.v4().slice(0, 8);
  const salt = await bcrypt.genSalt(10);
  userFields.password = await bcrypt.hash(password, salt);

  const avatar = gravatar.url(email, {
    s: "200",
    r: "pg",
    d: "mm",
  });
  userFields.avatar = avatar;
  user = new User(userFields);
  await user.save();

  const templateFields = {
    name: name,
    email: email,
    password: password,
    selectedTemplate: "NEW_ACCOUNT_MESSAGE",
  };

  let emailService = new EmailService(templateFields);
  emailService.sendEmail();

  let response = {
    Status: "SUCCESS",
    Message: name + " has been created and a welcome email sent",
    User: user,
  };
  return response;
};

/*Update User*/
UserService.prototype.updateUser = async function (updatedUserArgs) {
  let { id, email, name, postcode, roleId } = updatedUserArgs;
  const userFields = { id, email, name, role: roleId, postcode };

  let userWithEmail = await User.findOne({ email: email });
  if (userWithEmail && userWithEmail._id != id) {
    let response = {
      Status: "FAILED",
      Message: email + " already exists and is assigned to another user",
    };
    return response;
  }

  let user = await User.findOne({ _id: id });
  if (user) {
    user = await User.findOneAndUpdate(
      { _id: id },
      { $set: userFields },
      {
        new: true,
      }
    );
  }

  let response = {
    Status: "SUCCESS",
    Message: name + " has been updated",
    User: user,
  };
  return response;
};

/*Create Or Update User*/
UserService.prototype.createOrUpdateUser = async function (userArgs) {
  if (userArgs.id === "temp") {
    let newUserResult = await this.createUser(userArgs);
    return newUserResult;
  }
  let updatedUserResult = await this.updateUser(userArgs);
  return updatedUserResult;
};

/*Delete User*/
UserService.prototype.deleteUser = async function (params) {
  try {
    const { id } = req.params;
    await User.findOneAndRemove({ _id: id });
    return true;
  } catch {
    return false;
  }
};
UserService.prototype.resetPassword = async function () {};
UserService.prototype.lockUser = async function () {};
UserService.prototype.onFailedLogin = async function () {};

module.exports = UserService;
