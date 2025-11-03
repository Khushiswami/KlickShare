import mongoose, { Schema, Document } from "mongoose";

export interface IPhoto extends Document {
  groupId: mongoose.Types.ObjectId;
  imageUrl: string;
  title?: string;
  uploadedAt: Date;
}

const PhotoSchema: Schema = new Schema(
  {
    groupId: { type: Schema.Types.ObjectId, ref: "Group", required: true },
    imageUrl: { type: String, required: true },
    title: { type: String },
    uploadedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Photo ||
  mongoose.model<IPhoto>("Photo", PhotoSchema);
