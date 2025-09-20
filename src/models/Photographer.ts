

import mongoose, { Schema, Document } from "mongoose";

export interface IPhotographer extends Document {
  name: string;
  companyName: string;
  mobileNumber: string;
  email: string;
  otp: string;
  status: "active" | "inactive";
}

const PhotographerSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    companyName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    email: { type: String, required: true },
    otp: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "inactive" },
  },
  { timestamps: true }
);

export default mongoose.models.Photographer ||
  mongoose.model<IPhotographer>("Photographer", PhotographerSchema);
