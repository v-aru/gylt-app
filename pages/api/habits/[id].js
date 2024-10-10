import dbConnect from '@/backend/dbConnect';
// import Habit from '@/backend/models/Habit'; 
import Habit from '@backend/models/Habit';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;
  const { id } = req.query;
  
  switch(method) {   
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
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
  }
}