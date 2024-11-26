import mongoose, { Schema } from "mongoose";

const UserSchema = mongoose.Schema(
  {
    accountId: { type: Schema.Types.ObjectId, ref: "Account" },
    name: { type: String, required: true },
    phone: { type: String, unique: true, required: true },
    jobTitle: { type: String },
    //url to the pdf file stored
    //not required
    cv: { type: String },
    //url to the pdf file stored
    //todo check this ?
    socialSecurity: { type: String },
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
