let user = require("../model/userModel")
let config = require('../config/config')

let moreFunctions = {
    fixtureUser: async () => {
        try {
            let res = await user.findOne({
                role: "admin"
            });
            if (res === null) {
                let userAdmin = await user.create(config.adminCredentials)
                console.log("Fixture user1 created successfully", userAdmin);
            }
        } catch (err) {
            console.log("error", err);
        }
    },
};

module.exports = moreFunctions;