const { Router } = require("express");
const  authMiddleware  = require("../middlewares/auth.middleware");
const interviewController = require("../controllers/interview.controller")

const interviewRouter = Router();

/**
 * @route POST /api/interview
 * @description generate a interview report of user on the basis of user self description, resume pdf and job description
 * @access Private
 */
interviewRouter.post("/",authMiddleware.authUserMiddleware,interviewController.generateInterviewReportController)

module.exports = interviewRouter;
