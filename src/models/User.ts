import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  mobileNumber: string;
  otp: string;
  status: "active" | "inactive";
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    otp: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
