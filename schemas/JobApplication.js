import mongoose, { Schema } from "mongoose";
import applicationStatuses from "../enums/application_status.js";

const JobApplicationSchema = mongoose.Schema(
  {
    applierId: { type: Schema.Types.ObjectId, ref: "User" },
    jobId: { type: Schema.Types.ObjectId, ref: "Job" },
    status: {
      type: String,
      enum: applicationStatuses,
      default: applicationStatuses[0],
    },
    letter: String,
    //todo add cv ?
  },
  { timestamps: true }
);

const JobApplicationModel = mongoose.model(
  "JobApplication",
  JobApplicationSchema
);

export default JobApplicationModel;
