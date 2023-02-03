"use strict";

let user = require("../model/userModel")
//   config = require("../config.server")
//   appConstants = require("../constansts");

let moreFunctions = {
  fixtureUser: async () => {
    try {
      let res = await user.findOne({
        selectedRole: { $in: [config.roles.admin] },
      });
      if (res === null) {
        let user = await models.users.create({
          email: "admin@livingbeauty.com",
          password: "test@123",
          phoneNumber: "0000000000",
          roles: [config.roles.admin],
          isNewUser: true
        });
        console.log("Fixture user1 created successfully", user._id);

        let user2 = await models.users.create({
          email: "ariana@livingbeauty.org",
          firstName: "Ariana",
          lastName: " ",
          password: "Foundation20!",
          phoneNumber: "0000000000",
          roles: [config.roles.admin],
          isNewUser: true
        });
        console.log("Fixture user2 created successfully", user2._id);
      }
    } catch (err) {
      console.log("error", err);
    }
  },
};

module.exports = moreFunctions;