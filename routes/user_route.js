import express from "express";
import UserRepository from "../helpers/UserRepository.js";
import AccountRepository from "../helpers/AccountRepository.js";

const userRouter = express.Router();

//todo add middlewares

userRouter
  .route("")
  .get(async (req, res) => {
    try {
      const queries = req.query || {};
      const users = await UserRepository.find({ queries });
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  })
  .post(async (req, res) => {
    try {
      const user = req.body;
      const account = await AccountRepository.create({
        username: user.username,
        password: user.password,
        type: "user",
      });
      user.accountId = account._id;
      const newUser = await UserRepository.create(user);
      return res.json({ id: newUser._id });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

userRouter
  .route("/:id")
  .get(async (req, res) => {
    try {
      const id = req.params.id;
      const user = await UserRepository.findById(id, "-password");

      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const id = req.params.id;
      const result = await UserRepository.delete(id);
      return res.json(result._id);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

export default userRouter;
