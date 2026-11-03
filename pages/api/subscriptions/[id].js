import dbConnect from "@/backend/dbConnect";
import Subscription from "@/backend/model/Subscription";
import { pick, requireUserId } from "@/lib/apiAuth";
import { SUBSCRIPTION_FIELDS } from "./index";

export default async function handler(req, res) {
  const userId = await requireUserId(req, res);
  if (!userId) return;

  const { id } = req.query;

  try {
    await dbConnect();

    switch (req.method) {
      case "GET": {
        const subscription = await Subscription.findOne({ _id: id, userId });
        if (!subscription) return res.status(404).json({ message: "Subscription not found" });
        return res.status(200).json(subscription);
      }

      case "PUT": {
        const subscription = await Subscription.findOneAndUpdate({ _id: id, userId }, pick(req.body, SUBSCRIPTION_FIELDS), {
          new: true,
          runValidators: true,
        });
        if (!subscription) return res.status(404).json({ message: "Subscription not found" });
        return res.status(200).json(subscription);
      }

      case "DELETE": {
        const subscription = await Subscription.findOneAndDelete({ _id: id, userId });
        if (!subscription) return res.status(404).json({ message: "Subscription not found" });
        res.status(204).end();
        return;
      }

      default:
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    const status = ["ValidationError", "CastError"].includes(error.name) ? 400 : 500;
    res.status(status).json({ message: error.message });
  }
}
