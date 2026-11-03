import dbConnect from "@/backend/dbConnect";
import Habit from "@/backend/model/Habit";
import { pick, requireUserId } from "@/lib/apiAuth";
import { HABIT_FIELDS } from "./index";

export default async function handler(req, res) {
  const userId = await requireUserId(req, res);
  if (!userId) return;

  const { id } = req.query;

  try {
    await dbConnect();

    switch (req.method) {
      case "GET": {
        const habit = await Habit.findOne({ _id: id, userId });
        if (!habit) return res.status(404).json({ message: "Habit not found" });
        return res.status(200).json(habit);
      }

      case "PUT": {
        const habit = await Habit.findOneAndUpdate({ _id: id, userId }, pick(req.body, HABIT_FIELDS), {
          new: true,
          runValidators: true,
        });
        if (!habit) return res.status(404).json({ message: "Habit not found" });
        return res.status(200).json(habit);
      }

      case "DELETE": {
        const habit = await Habit.findOneAndDelete({ _id: id, userId });
        if (!habit) return res.status(404).json({ message: "Habit not found" });
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
