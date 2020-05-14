const Roles = require("../models/Roles");

class RoleService {
  constructor() {}
  async getRoleById(roleId) {
    let role = await Roles.findOne({ _id: roleId });
    return role;
  }

  async getRoleByCode(code) {
    let role = await Roles.findOne({ code: code });
    return role;
  }

  async updateRoles(roleArgs) {
    try {
      let searchName = new RegExp(roleArgs.term, "i");
      //check if name exists
      let role = await Roles.findOne({ name: name });
      if (role) {
        return res.status(400).json({
          errors: [{ msg: "A Role with the same name already exists" }],
        });
      }

      //check if new role
      if (id === "temp") {
        roleFields.id = uuid.v4();
        let role = new Roles(roleFields);
        await role.save();
        const roles = await Roles.find({ name: searchName })
          .skip(Number(page - 1) * Number(limit))
          .limit(Number(limit));
        return res.json(roles);
      }

      //check updated role
      role = await Roles.findOne({ _id: id });
      if (role) {
        role = await Roles.findOneAndUpdate(
          { _id: id },
          { $set: roleFields },
          {
            new: true,
          }
        );
      }
      const roles = await Roles.find({ name: searchName })
        .skip(Number(page - 1) * Number(limit))
        .limit(Number(limit))
        .sort({ name: 1 });
      return res.json(roles);
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
}

module.exports = RoleService;
