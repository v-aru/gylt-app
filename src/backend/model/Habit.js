import mongoose from "mongoose";

const { Schema } = mongoose;

const habitSchema = new Schema({
  habitName: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  frequency: { type: String, enum: ["daily", "weekly", "monthly", "custom"], default: "daily" },
  // Weekdays ('Mon'..'Sun') a custom habit is due on.
  days: { type: [String], default: [] },
  // Local calendar date the habit starts on, 'YYYY-MM-DD'.
  startDate: { type: String, required: true },
  color: { type: String, default: "#ADA2FF" },
  // Local calendar dates the habit was completed on, 'YYYY-MM-DD'.
  completedDates: { type: [String], default: [] },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
});

const Habit = mongoose.models.Habit || mongoose.model("Habit", habitSchema, "habits-collection");

export default Habit;
