const UserModel = require("../models/users.model");

const createUserInToDB = async (user) => {
  // try {
  //   console.log({ user });

  const result = await UserModel.create(user);
  return result;
  //   console.log("result in services", result);

  //   // return result;
  // } catch (error) {
  //   console.log("error in services", error);
  // }
};

const userServices = { createUserInToDB };

module.exports = userServices;
