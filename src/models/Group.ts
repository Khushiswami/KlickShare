import mongoose, { Schema, Document } from "mongoose";

export interface IGroup extends Document {
  name: string;
  members: number;
  status: "active" | "inactive";
}

const GroupSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    members: { type: Number, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

export default mongoose.models.Group ||
  mongoose.model<IGroup>("Group", GroupSchema);