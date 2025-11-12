import mongoose, { Schema, Document } from "mongoose";
import "@/models/Photo"; 

export interface IGroup extends Document {
  name: string;
  members: number;
  status: "active" | "inactive";
  photos: mongoose.Types.ObjectId[];
}

const GroupSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    members: { type: Number, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    photos: [{ type: Schema.Types.ObjectId, ref: "Photo" }],   
  },
  { timestamps: true }
);

export default mongoose.models.Group ||
  mongoose.model<IGroup>("Group", GroupSchema);