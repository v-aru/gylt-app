// backend/models/Habit.js
import { Schema, model } from 'mongoose';
import Habit, { find, findByIdAndUpdate, findByIdAndDelete } from './models/Habit';

const habitSchema = new Schema({
  habitName: { type: String, required: true },
  frequency: { type: String, required: true },
  days: { type: [String], default: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  date: { type: Date, default: Date.now },
  color: { type: String, default: '#000000' },
  completed: { type: Boolean, default: false },
});

const Habit = model('Habit', habitSchema);

export default Habit;

// Create a new habit
app.post('/habits', async (req, res) => {
  try {
    console.log('POST /api/habits called:', req.body);
    const habit = new Habit(req.body);
    await habit.save();
    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all habits
app.get('/habits', async (req, res) => {
  try {
    const habits = await find();
    res.status(200).json(habits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a habit
app.put('/api/habits/:id', async (req, res) => {
  try {
    const habit = await findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(habit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a habit
app.delete('/api/habits/:id', async (req, res) => {
  try {
    await findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});