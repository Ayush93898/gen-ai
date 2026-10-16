const pdfParse = require("pdf-parse");
const generateInterviewReport = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

/**
 * @name generateInterviewReportController
 * @description generate a interview report of user on the basis of user self description, resume pdf and job description
 * @access Private
 */
const generateInterviewReportController = async (req, res) => {
  const resumeContent = pdfParse(req.file.buffer);
  const { selfDescription, jobDescription } = req.body;

  const interviewReportByAi = await generateInterviewReport({
    resume: resumeContent,
    selfDescription,
    jobDescription,
  });

  const interviewReport = await interviewReportModel.create({
    user: req.user.id,
    resume: resumeContent,
    selfDescription,
    jobDescription,
    ...interviewReportByAi, // for tech/behav qs
  });

  res.status(201).json({
    message: "interview report generated successfully!!",
    interviewReport,
  });
};

module.exports = { generateInterviewReportController };
