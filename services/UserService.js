const User = require("../models/User");

function UserService() {}

UserService.prototype.countUsers = async function (term = null) {
  if (term === null) {
    const userCount = await User.countDocuments();
    return userCount;
  }
  console.log("user service with term");
  const regTerm = new RegExp(term, "i");
  const userCount = await User.countDocuments({
    $or: [{ name: regTerm }, { email: regTerm }, { postcode: regTerm }],
  });
  return userCount;
};

UserService.prototype.getUsers = function () {};
UserService.prototype.createUser = function () {};
UserService.prototype.updateUser = function () {};
UserService.prototype.deleteUser = function () {};
UserService.prototype.resetPassword = function () {};
UserService.prototype.lockUser = function () {};
UserService.prototype.onFailedLogin = function () {};

module.exports = UserService;
