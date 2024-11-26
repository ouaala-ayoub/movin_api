import mongoose from "mongoose";
import { hash } from "bcrypt";

const requiredString = { type: String, unique: true, required: true };

const AccountSchema = mongoose.Schema({
  username: requiredString,
  password: requiredString,
  // todo status : active / non active
  type: {
    type: String,
    required: true,
    //arguable
    enum: ["hirer", "user"],
    default: "user",
  },
});

AccountSchema.pre("save", async function (next) {
  try {
    const hashedPassword = await hash(this.password, 10);
    this.password = hashedPassword;

    next();
  } catch (error) {
    next(error);
  }
});

const AccountModel = mongoose.model("Account", AccountSchema);
export default AccountModel;
