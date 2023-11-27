const express = require("express");
const userControllers = require("../controllers/users.controllers");
const router = express.Router();

router.post("/create-user", userControllers.createUser);

router.get("/verify-user", userControllers.verifyUser);
router.get("/my-trees", userControllers.myTrees);



module.exports = { userRouter: router };
