import express from "express";
import JobRepository from "../helpers/JobRepository.js";

const jobRouter = express.Router();

jobRouter
  .route("")
  .get(async (req, res) => {
    try {
      const queries = req.query || {};
      const jobs = await JobRepository.find(queries);
      return res.json(jobs);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  })
  .post(async (req, res) => {
    try {
      const job = req.body;
      const newJob = await JobRepository.create(job);
      return res.json({ id: newJob._id });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

jobRouter
  .route("/:id")
  .get(async (req, res) => {
    try {
      const id = req.params.id;
      const job = await JobRepository.findById(id);
      return res.json(job);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const id = req.params.id;
      const result = await JobRepository.delete(id);
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

export default jobRouter;
