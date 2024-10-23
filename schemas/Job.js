import mongoose, { Schema } from "mongoose";
import { contractTypes } from "../enums/contract_types.js";

const JobSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    salary: String,
    //period only required if salary if provided
    period: {
      type: String,
      enum: ["h", "w", "m", "y"],
      required: function () {
        return this.salary != null;
      },
    },
    location: { type: String, required: true },
    description: { type: String, required: true },
    activitySector: String,
    contractType: { type: String, enum: contractTypes, required: true },
    numberOfPosts: { type: Number, default: 1 },
    details: {
      type: Map,
      of: String,
    },
    hirerId: { type: Schema.Types.ObjectId, ref: "Hirer" },
  },
  { timestamps: true }
);

const JobModel = mongoose.model("Job", JobSchema);
export default JobModel;
