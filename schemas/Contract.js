import mongoose, { Schema } from "mongoose";
import { contractTypes } from "../enums/contract_types.js";

const ContractSchema = new Schema(
  {
    jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
    start: { type: Date, required: true },
    // End date is optional, meaning the contract has an undetermined duration
    end: { type: Date },
    status: {
      type: String,
      enum: ["Pending", "Signed", "Canceled"],
      required: true,
    },
    signature: {
      type: String,
      required: function () {
        return this.status === "Signed";
      },
      match: [/^https?:\/\/[^\s$.?#].[^\s]*$/, "Invalid URL format"], // Optional: Validate URL format
    },
    // Replace with actual field type and requirements
    contractType: { type: String, enum: contractTypes, required: true },
  },
  { timestamps: true }
);

// Adding indexes for better query performance
ContractSchema.index({ jobId: 1 });
ContractSchema.index({ status: 1 });

const ContractModel = mongoose.model("Contract", ContractSchema);
export default ContractModel;
