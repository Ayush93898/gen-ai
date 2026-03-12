const { Router } = require("express");
const authController = require("../controllers/auth.controller")

const authRouter = Router();

 /**
  * @route POST /api/auht/register
  * @description Register new user
  * @access Public
  */
authRouter.post("/register",authController.registerUserController)

 /**
  * @route POST /api/auht/login
  * @description login user with email and password
  * @access Public
  */
authRouter.post("/login",authController.loginUserController)


module.exports = authRouter;
