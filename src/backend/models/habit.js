// backend/models/Habit.js
// import mongoose, { Schema, model } from 'mongoose';
const mongoose = require('mongoose');
const { Schema } = mongoose;


const habitSchema = new Schema({
  habitName: { type: String, required: true },
  frequency: { type: String, required: true },
  category: { type: String, required: true },
  days: { type: [String], default: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  date: { type: Date, default: Date.now },
  color: { type: String, default: '#000000' },
  completed: { type: Boolean, default: false },
});

const Habit = mongoose.models.Habit || mongoose.model('Habit', habitSchema, 'habits-collection');

export default Habit; 