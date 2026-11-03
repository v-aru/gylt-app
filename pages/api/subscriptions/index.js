import dbConnect from "@/backend/dbConnect";
import Subscription from "@/backend/model/Subscription";
import { pick, requireUserId } from "@/lib/apiAuth";

export const SUBSCRIPTION_FIELDS = ["name", "category", "cost", "currency", "billingCycle", "nextRenewal", "paymentMethod", "remindDaysBefore", "color"];

export default async function handler(req, res) {
  const userId = await requireUserId(req, res);
  if (!userId) return;

  try {
    await dbConnect();

    switch (req.method) {
      case "GET": {
        const subscriptions = await Subscription.find({ userId }).sort({ nextRenewal: 1 });
        return res.status(200).json(subscriptions);
      }

      case "POST": {
        const subscription = await Subscription.create({ ...pick(req.body, SUBSCRIPTION_FIELDS), userId });
        return res.status(201).json(subscription);
      }

      default:
        res.setHeader("Allow", ["GET", "POST"]);
        return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    const status = error.name === "ValidationError" ? 400 : 500;
    res.status(status).json({ message: error.message });
  }
}
