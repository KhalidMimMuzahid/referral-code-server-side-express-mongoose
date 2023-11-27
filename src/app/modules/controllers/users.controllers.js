const userServices = require("../services/users.service");

const createUser = async (req, res) => {
  try {
    const user = req.body;
    const result = await userServices.createUserInToDB(user);

    // console.log("okkkk:", result);
    res.json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

const verifyUser = async (req, res) => {
  try {
    const userString = req.headers.user;
    const user = JSON.parse(userString);
    const result = await userServices.verifyUserToDB(user);
    console.log("result:", result);
    if (result.success) {
      res.json({
        success: true,
        message: result.message,
        data: result.data,
      });
    } else {
      res.status(200).json({
        success: false,
        message: result.message,
      });
    }
  } catch (error) {
    res.status(200).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

const userControllers = { createUser, verifyUser };
module.exports = userControllers;
