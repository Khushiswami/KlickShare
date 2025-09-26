import mongoose, { Schema, Document, Types } from "mongoose";

export interface IBusinessDetail extends Document {
  userId: Types.ObjectId; // Reference to User _id
  companyName: string;
  specialization: string;
  experience: string;
  portfolio?: string;
}

const BusinessDetailSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  companyName: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: String, required: true },
  portfolio: { type: String },
});

export default mongoose.models.BusinessDetail ||
  mongoose.model<IBusinessDetail>("BusinessDetail", BusinessDetailSchema);
