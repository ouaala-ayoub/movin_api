import express from "express";
import { getAuth, login } from "../helpers/auth_helpers.js";

const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  try {
    await login(req, res);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

authRouter.get("", async (req, res) => {
  try {
    const auth = await getAuth(req.cookies.session);
    return res.json(auth);
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
});

export default authRouter;
