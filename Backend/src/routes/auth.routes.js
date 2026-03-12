const { Router } = require("express");
const authController = require("../controllers/auth.controller")
const authMiddleware = require('../middlewares/auth.middleware')

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

/**
 * @route GET /api/auth/logout
 * @description clear token from the user cookie and add token in the blacklist
 * @access PUBLIC
 */
authRouter.get("/logout",authController.logoutUserController)

/**
 * @route GET /api/auth/get-me
 * @description get the current logged in user details
 * @access PRIVATE
 */
authRouter.get("/get-me",authMiddleware.authUserMiddleware,authController.getMeController)



module.exports = authRouter;
