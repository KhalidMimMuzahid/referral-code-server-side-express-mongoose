const encrypt = require("../../utils/cryptPass");
const UserModel = require("../models/users.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
// const salt = bcrypt.genSaltSync(saltRounds);
const createUserInToDB = async (user) => {
  // first finding user with this email, If findOneAndUpdate, means duplicate email, cause somethime  {unique: true} not works on the schema
  const userData = await UserModel.findOne({ email: user?.email });

  if (userData?.email) {
    return false;
  }
  const lastUser = await UserModel.findOne().sort({
    referredID: -1,
  });

  if (lastUser?.referredID) {
    user.referredID = lastUser?.referredID + 1;
    user.referredTo = Math.ceil((user.referredID - 1) / 4);
  } else {
    user.referredID = 1;
    user.referredTo = 0;
  }
  const encryptPass = await encrypt.cryptPassword(user.password);
  const result = await UserModel.create({ ...user, password: encryptPass });
  return result;
};

verifyUserToDB = async (user) => {
  // console.log({ user });

  const { email, password } = user;
  const userData = await UserModel.findOne({ email });

  console.log({ userData });
  if (userData?.email) {
    // check password

    const isValidUser = await encrypt.comparePassword(
      password,
      userData?.password
    );
    console.log("isValidUser:", isValidUser);
    return isValidUser
      ? { success: true, message: "successfully logged in", data: userData }
      : { success: false, message: "invalid password" };
  } else {
    return { success: false, message: "email not found" };
  }
};

const myTreesFromDB = async (referredID) => {
  // finding all user who referred me by default
  const referredUsers = await UserModel.find({ referredTo: referredID });

  return referredUsers;
};
const userServices = { createUserInToDB, verifyUserToDB, myTreesFromDB };

module.exports = userServices;
