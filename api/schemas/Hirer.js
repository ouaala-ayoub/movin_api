import mongoose, { Schema } from "mongoose";

const requiredString = { type: String, required: true };
const HirerSchema = mongoose.Schema(
  {
    accountId: { type: Schema.Types.ObjectId, ref: "Account" },
    name: requiredString,
    contact: requiredString,
    image: requiredString,
    location: requiredString,
    ice: requiredString,
  },
  { timestamps: true }
);

const HirerModel = mongoose.model("Hirer", HirerSchema);

export default HirerModel;