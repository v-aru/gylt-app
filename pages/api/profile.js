import dbConnect from "@/backend/dbConnect";
import User from "@/backend/model/User";
import { pick, requireUserId } from "@/lib/apiAuth";

const PROFILE_FIELDS = ["username", "firstName", "lastName", "dateOfBirth", "gender", "city"];

export default async function handler(req, res) {
  const userId = await requireUserId(req, res);
  if (!userId) return;

  try {
    await dbConnect();

    switch (req.method) {
      case "GET": {
        const user = await User.findById(userId).lean();
        if (!user) return res.status(404).json({ message: "User not found" });
        return res.status(200).json(pick(user, [...PROFILE_FIELDS, "email"]));
      }

      case "PUT": {
        const user = await User.findByIdAndUpdate(userId, pick(req.body, PROFILE_FIELDS), {
          new: true,
          runValidators: true,
        }).lean();
        if (!user) return res.status(404).json({ message: "User not found" });
        return res.status(200).json(pick(user, [...PROFILE_FIELDS, "email"]));
      }

      default:
        res.setHeader("Allow", ["GET", "PUT"]);
        return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    console.error("Profile API error:", error);
    res.status(500).json({ message: "Something went wrong with your profile." });
  }
}
