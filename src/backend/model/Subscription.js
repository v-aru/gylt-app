import mongoose from "mongoose";

const { Schema } = mongoose;

const subscriptionSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, trim: true },
    cost: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "EUR" },
    billingCycle: { type: String, enum: ["weekly", "monthly", "yearly"], default: "monthly" },
    // Next renewal as a local calendar date, 'YYYY-MM-DD'.
    nextRenewal: { type: String, required: true },
    // Free-text label such as "PayPal" or "Credit card"; never card details.
    paymentMethod: { type: String, trim: true },
    remindDaysBefore: { type: Number, default: 3, min: 0 },
    color: { type: String, default: "#03AED2" },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
  },
  { timestamps: true }
);

const Subscription =
  mongoose.models.Subscription ||
  mongoose.model("Subscription", subscriptionSchema, "subscriptions-collection");

export default Subscription;
