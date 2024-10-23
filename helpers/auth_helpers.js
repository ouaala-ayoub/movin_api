import BaseRepository from "./BaseRepository.js";
import bcrypt from "bcrypt";
import { ObjectId } from "bson";
import jwt from "jsonwebtoken";
import AccountModel from "../schemas/Account.js";
import HirerModel from "../schemas/Hirer.js";
import UserModel from "../schemas/User.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.session;
    const targetedId = req.params.id;

    if (!ObjectId.isValid(targetedId)) throw new Error("Invalid id");

    if (!token) throw new Error("no session cookie");

    const auth = await getAuth(token);
    if (!auth) throw new Error("Unauthorized");

    if (targetedId != auth.payload._id) throw new Error("Unauthorized");

    req.auth = auth.payload;
    next();
  } catch (e) {
    res.status(401).json({ message: e.message });
  }
};

export const getAuth = async (token) => {
  if (!token) throw new Error("no session cookie");
  const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
  const type = decodedPayload.type;

  if (type != "hirer" && type != "user") throw new Error("Invalid type");

  let obj;
  if (type === "hirer") {
    obj = await HirerModel.findById(decodedPayload.payload._id);
  } else {
    obj = await UserModel.findById(decodedPayload.payload._id);
  }
  console.log(obj);
  if (!obj) throw new Error("User not found");
  const payload = { type, payload: obj };

  return payload;
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    throw new Error("Please provide username and password");

  const account = await AccountModel.findOne({ username });

  if (!account) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, account.password);

  if (!isMatch) {
    throw new Error("Mot de passe incorrect");
  }

  let obj;

  if (account.type === "hirer") {
    obj = await HirerModel.findOne({ accountId: account._id });
  } else {
    obj = await UserModel.findOne({ accountId: account._id });
  }

  if (!obj) throw new Error("User not found");

  const expiresIn = 30 * 24 * 60 * 60 * 1000;
  const maxAge = expiresIn / 1000;
  const payload = { type: account.type, payload: obj };

  const token = generateJwt(payload, "30d");

  const options = {
    maxAge: maxAge,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
  };

  res.cookie("session", token, options);

  return res.json(payload);
};
const generateJwt = (obj, expiresIn) => {
  const token = jwt.sign(obj, process.env.JWT_SECRET, {
    expiresIn: expiresIn,
  });

  return token;
};
