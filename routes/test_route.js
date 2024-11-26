import express from "express";

const testRouter = express.Router();

testRouter.get("", (req, res) => {
  res.send("Test route works!");
});

export default testRouter;
