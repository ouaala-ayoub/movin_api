import express from "express";
import HirerRepository from "../helpers/HirerRepository.js";
import AccountRepository from "../helpers/AccountRepository.js";
import { authMiddleware } from "../helpers/auth_helpers.js";
import JobRepository from "../helpers/JobRepository.js";

const hirerRouter = express.Router();

hirerRouter
  .route("")
  .get(async (req, res) => {
    try {
      const queries = req.query || {};
      const hirers = await HirerRepository.find({ queries });
      return res.json(hirers);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  })
  .post(async (req, res) => {
    try {
      const hirer = req.body;
      const account = await AccountRepository.create({
        username: hirer.username,
        password: hirer.password,
        type: "hirer",
      });

      hirer.accountId = account._id;
      const newHirer = await HirerRepository.create(hirer);
      return res.json({ id: newHirer._id });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

hirerRouter
  .route("/:id")
  .all(async (req, res, next) => await authMiddleware(req, res, next))
  .get(async (req, res) => {
    try {
      console.log(req.auth._id);
      const hirer = await HirerRepository.findById(req.auth._id, "-password");
      return res.json(hirer);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  })
  .put(async (req, res) => {
    try {
      const hirerData = req.body;
      const updatedHirer = await HirerRepository.update(
        req.auth._id,
        hirerData
      );
      return res.json({ id: updatedHirer._id });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const result = await HirerRepository.delete(req.auth._id);
      return res.json({ id: result._id });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });
hirerRouter
  .route("/:id/posted_jobs")
  .all(async (req, res, next) => await authMiddleware(req, res, next))
  .get(async (req, res) => {
    try {
      const hirerId = req.auth._id;
      console.log(hirerId);
      //todo check if this is working
      const jobs = await JobRepository.find({ hirerId: hirerId });
      return res.json(jobs);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });
//todo only delete if hirer of the job

export default hirerRouter;
