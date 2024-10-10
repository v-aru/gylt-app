import dbConnect from '@/backend/dbConnect';
import Habit from '../../../src/backend/models/Habit'; 

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;
  const { id } = req.query;
  
  switch(method) {
    case 'GET': 
      try {
        const habits = await Habit.find(); // Get all habits
        res.status(200).json(habits);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;
    
      case 'POST':
        try {
          const habit = new Habit(req.body);
          await habit.save();
          res.status(201).json(habit);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
        break;
      
      case 'PUT':
        try {
          const updatedHabit = await Habit.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
          if (!updatedHabit) {
            return res.status(404).json({ success: false, message: 'Habit not found' });
          }
          res.status(200).json(updatedHabit);
        } catch (error) {
          res.status(400).json({ success: false, error: error.message });
        }
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT']);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
  }
}