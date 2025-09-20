import mongoose, { Schema, Document, models } from "mongoose";

export interface ISubscription extends Document {
  photographer: mongoose.Types.ObjectId;
  plan: string;
  startDate: Date;
  endDate: Date;
  status: "active" | "expired" | "cancelled";
}

const SubscriptionSchema = new Schema<ISubscription>(
  {
    photographer: {
      type: Schema.Types.ObjectId,
      ref: "User", // assumes you already have a User model
      required: true,
    },
    plan: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["active", "expired", "cancelled"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Subscription =
  models.Subscription || mongoose.model<ISubscription>("Subscription", SubscriptionSchema);

export default Subscription;
