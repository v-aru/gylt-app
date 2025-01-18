const mongoose = require('mongoose');
const { Schema } = mongoose;


const habitSchema = new Schema({
  habitName: { type: String, required: true },
  frequency: { type: String, enum: ['daily', 'weekly', 'monthly', 'custom'], required: true },
  category: { type: String, required: true },
  days: { type: [String], default: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  startDate : {type: Date, default: Date.now },
  date: { type: Date, default: Date.now },
  color: { type: String, default: '#000000' },
  daysOfWeek: { type: Number, required: false },
  specificDates: { type: [Date], required: false },
  checkedDates: { type: [Date], required: false },
  completed: { type: Boolean, default: false },
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  completedDates: { type: [String], required: false }
});

const Habit = mongoose.models.Habit || mongoose.model('Habit', habitSchema, 'habits-collection');

export default Habit; 


// specificDates: { type: [Date], required: false }, // If the user specifies exact dates
//   checkedDates: { type: [Date], required: false }, // Dates when habit was checked off/completed
//   completedDates: { type: [String], required: false }, // Store completed dates as 'YYYY-MM-DD' strings