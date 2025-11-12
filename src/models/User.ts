import mongoose, { Schema, Document } from "mongoose";
import { unique } from "next/dist/build/utils";

export interface IUser extends Document {
  name: string;
  mobileNumber: string;
  otp: string;
  status: "active" | "inactive";
  userType: "user" | "admin" | "photographer";
  isActive: boolean;
  email?: string; // <- generic email

  loginAttempts: number;
  blockedUntil?: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: false },
    mobileNumber: { type: String, required: true,unique:true },
    otp: { type: String, required: false },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    userType: {
      type: String,
      enum: ["user", "admin", "photographer"], // 🔁 Add more types if needed
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },  
    loginAttempts: { type: Number, default: 0 },
    blockedUntil: { type: Date, default: null },
    email: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);