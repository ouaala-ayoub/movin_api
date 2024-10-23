import express from "express";
import ContractRepository from "../helpers/ContractRepository.js"; // Ensure you have this repository
import mongoose from "mongoose";

const contractRouter = express.Router();

contractRouter
  .route("")
  .get(async (req, res) => {
    try {
      const queries = req.query || {};
      const contracts = await ContractRepository.find(queries);
      return res.json(contracts);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  })
  .post(async (req, res) => {
    try {
      const contract = req.body;
      const newContract = await ContractRepository.create(contract);
      return res.status(201).json({ id: newContract._id });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

contractRouter
  .route("/:id")
  .get(async (req, res) => {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid contract ID" });
      }

      const contract = await ContractRepository.findById(id);
      if (!contract) {
        return res.status(404).json({ error: "Contract not found" });
      }
      return res.json(contract);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const id = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid contract ID" });
      }

      const result = await ContractRepository.delete(id);
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "Contract not found" });
      }
      return res.json({ message: "Contract deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

export default contractRouter;
