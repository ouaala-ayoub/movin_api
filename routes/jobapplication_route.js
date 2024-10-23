import express from "express";
import JobApplicationRepository from "../helpers/JobApplicationRepository.js";

const jobApplicationRouter = express.Router();

// jobApplicationRouter
jobApplicationRouter
  .route("")
  //todo remove or limit access to admin
  .get(async (req, res) => {
    try {
      const applications = await JobApplicationRepository.find();
      return res.json(applications);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  })
  .post(async (req, res) => {
    try {
      const jobApplication = req.body;
      const newJobApplication = await JobApplicationRepository.create(
        jobApplication
      );
      return res.json({ id: newJobApplication._id });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

export default jobApplicationRouter;
