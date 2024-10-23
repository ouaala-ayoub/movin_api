import mongoose, { Schema } from "mongoose";

const UserSchema = mongoose.Schema(
  {
    accountId: { type: Schema.Types.ObjectId, ref: "Account" },
    name: { type: String, required: true },
    phone: { type: String, unique: true, required: true },
    jobTitle: { type: String },
    //url to the pdf file stored
    cv: { type: String, required: true },
    //url to the pdf file stored
    socialSecurity: { type: String, required: true },
    //   preferedContractTypes: {
    //     type: [String],
    //     enum: ["CDI", "CDD", "ANAPEC", "INTERIM"],
    //     required: true,
    //   },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
