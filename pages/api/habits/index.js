import dbConnect from "@/backend/dbConnect";
import Habit from "@/backend/model/Habit";
import { pick, requireUserId } from "@/lib/apiAuth";

export const HABIT_FIELDS = ["habitName", "category", "frequency", "days", "startDate", "color", "completedDates"];

export default async function handler(req, res) {
  const userId = await requireUserId(req, res);
  if (!userId) return;

  try {
    await dbConnect();

    switch (req.method) {
      case "GET": {
        const habits = await Habit.find({ userId }).sort({ _id: 1 });
        return res.status(200).json(habits);
      }

      case "POST": {
        const habit = await Habit.create({ ...pick(req.body, HABIT_FIELDS), userId });
        return res.status(201).json(habit);
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
