const https = require("https");
const EmailService = require("../services/EmailService");
const User = require("../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const Verifier = require("email-verifier");

class UserService {
  constructor() {}
  /*Count Users */
  async countUsers(term = null) {
    if (term === null) {
      const userCount = await User.countDocuments();
      return userCount;
    }
    const regTerm = new RegExp(term, "i");
    const userCount = await User.countDocuments({
      $or: [{ name: regTerm }, { email: regTerm }, { postcode: regTerm }],
    });
    return userCount;
  }

  /*Get Users*/
  async getUsers(params) {
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
  }

  /*Create User*/
  async createUser(newUserRequestArgs) {
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
      to: email,
      subject: "Welcome to Messages",
      name: name,
      email: email,
      password: password,
      selectedTemplate: "NEW_ACCOUNT_MESSAGE",
    };
    let emailService = new EmailService(templateFields);
    await emailService.sendEmail();
    let response = {
      Status: "SUCCESS",
      Message: name + " has been created and a welcome email sent",
      User: user,
    };
    return response;
  }

  /*Update User*/
  async updateUser(updatedUserArgs) {
    try {
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
    } catch (error) {
      console.log(error);
    }
  }

  /*Update User Details*/
  async updateUserDetails(updatedUserArgs) {
    try {
      let { id, email, name, postcode } = updatedUserArgs;
      const userFields = { id, email, name, postcode };
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
        Message: "Your details been updated",
        User: user,
      };
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  /*Update User*/
  async updateUserPassword(updatedUserArgs) {
    try {
      console.log(updatedUserArgs);

      let { id, currentPassword, newPassword } = updatedUserArgs;
      const userFields = { password: newPassword };
      let user = await User.findOne({ _id: id });
      if (user) {
        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
          let response = {
            Status: "danger",
            Message: "Incorrect password",
            User: user,
          };
          return response;
        }

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(newPassword, salt);
        user.password = password;
        await user.save();
      }
      let response = {
        Status: "success",
        Message: "Your password has been updated",
        User: user,
      };

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  /*Create Or Update User*/
  async createOrUpdateUser(userArgs) {
    if (userArgs.id === "temp") {
      let newUserResult = await this.createUser(userArgs);
      return newUserResult;
    }
    let updatedUserResult = await this.updateUser(userArgs);
    return updatedUserResult;
  }
  /*Delete User*/
  async deleteUser(params) {
    try {
      const { id } = params;
      await User.findOneAndRemove({ _id: id });
      return true;
    } catch {
      return false;
    }
  }
  async resetPassword(params) {
    try {
      const { id } = params;
      let user = await User.findOne({ _id: id });
      if (user) {
        let password = uuid.v4().slice(0, 8);
        const salt = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(password, salt);
        user.password = newPassword;
        await user.save();
        const templateFields = {
          to: user.email,
          subject: "Your password has been reset",
          name: user.name,
          email: user.email,
          password: password,
          selectedTemplate: "PASSWORD_RESET",
        };
        let emailService = new EmailService(templateFields);
        await emailService.sendEmail();
        let response = {
          Status: "SUCCESS",
          Message: user.name + " password has been reset",
          User: user,
        };
        return response;
      }
    } catch (err) {
      console.log(err.message);
      return false;
    }
  }
  async lockUser() {}
  async onFailedLogin() {}
}

module.exports = UserService;
