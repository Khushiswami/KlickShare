import mongoose, { Schema, Document, models } from "mongoose";

export interface ITransaction extends Document {
  user: mongoose.Types.ObjectId; // link to user/photographer
  amount: number;
  status: "success" | "pending" | "failed";
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "Photographer", required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["success", "pending", "failed"],
      default: "pending",
    },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Transaction =
  models.Transaction ||
  mongoose.model<ITransaction>("Transaction", TransactionSchema);

export default Transaction;
