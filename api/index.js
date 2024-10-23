import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./loadenv.mjs";
import connectDB from "./db/db.js";
import jobRouter from "./routes/job_route.js";
import hirerRouter from "./routes/hirer_route.js";
import userRouter from "./routes/user_route.js";
import contractRouter from "./routes/contract_route.js";
import authRouter from "./routes/auth_route.js";
import jobApplicationRouter from "./routes/jobapplication_route.js";

const app = express();
const PORT = process.env.PORT;

//connect db
connectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/jobs", jobRouter);
app.use("/hirers", hirerRouter);
app.use("/users", userRouter);
app.use("/contracts", contractRouter);
app.use("/jobApplications", jobApplicationRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  return res.send("Welcome to my API");
});

app.listen(PORT, () => {
  console.log("listening at port " + PORT);
});

export default app;