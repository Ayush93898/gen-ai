const { PDFParse } = require("pdf-parse");
const generateInterviewReport = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

const generateInterviewReportController = async (req, res) => {
  try {
    const { selfDescription, jobDescription } = req.body;

    if (!req.file || !req.file.buffer) {
      return res.status(400).json({
        message: "Resume PDF is required",
      });
    }

    if (!selfDescription || !jobDescription) {
      return res.status(400).json({
        message: "selfDescription and jobDescription are required",
      });
    }

    const pdf = new PDFParse({ data: req.file.buffer });
    const pdfData = await pdf.getText();
    const resumeText = pdfData.text?.trim() || "";

    const interviewReportByAi = await generateInterviewReport({
      resume: resumeText,
      selfDescription,
      jobDescription,
    });

    const interviewReport = await interviewReportModel.create({
      user: req.user.id,
      resume: resumeText,
      selfDescription,
      jobDescription,
      matchScore: interviewReportByAi.matchScore,
      technicalQuestions: interviewReportByAi.technicalQuestions,
      behavioralQuestion: interviewReportByAi.behavioralQuestions,
      skillGaps: interviewReportByAi.skillGaps,
      preparationPlans: interviewReportByAi.preparationPlan,
    });

    return res.status(201).json({
      message: "Interview report generated successfully",
      interviewReport,
    });
  } catch (error) {
    console.error("generateInterviewReportController error:", error);

    return res.status(500).json({
      message: "Failed to generate interview report",
      error: error.message,
    });
  }
};

module.exports = { generateInterviewReportController };