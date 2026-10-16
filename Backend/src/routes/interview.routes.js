const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const interviewController = require("../controllers/interview.controller");
const upload = require("../middlewares/file.middleware");

const interviewRouter = Router();

/**
 * @route POST /api/interview
 * @description generate a interview report of user on the basis of user self description, resume pdf and job description
 * @access Private
 */
interviewRouter.post(
  "/",
  authMiddleware.authUserMiddleware,
  upload.single("resume"),
  interviewController.generateInterviewReportController,
);

module.exports = interviewRouter;
