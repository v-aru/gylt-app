import { useState, useEffect } from 'react';
import { Form, Input, Button, HabitFrequencySelector } from './../CreateHabit/CreateHabitStyles';
import { CustomColorPicker } from '@/components/ColorPicker/ColorPicker';

export default function EditHabit({ habit, onSubmit }) {
    const [habitName, setHabitName] = useState('');
    const [category, setCategory] = useState('');
    const [frequencyType, setFrequencyType] = useState('daily');
    const [color, setColor] = useState('#000000');
    const [customDays, setCustomDays] = useState([]);

  useEffect(() => {
    console.log('Editing habit:', habit);
    if (habit) {
        setHabitName(habit.habitName || '');
        setCategory(habit.category || '');
        setFrequencyType(habit.frequency || 'daily');
        setColor(habit.color || '#000000');
        setCustomDays(habit.customDays || []);
      }
    }, [habit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedHabit = {
      ...habit, 
      habitName,
      category,
      frequency: frequencyType,
      color,
      customDays: frequencyType === 'custom' ? customDays : [],
    };

    onSubmit(updatedHabit); 
  };

  return (
    <Form onSubmit={handleSubmit}>
      <label htmlFor="habitName">Habit Name:</label>
      <Input
        type="text"
        placeholder="Enter habit name"
        value={habitName}
        onChange={(e) => setHabitName(e.target.value)}
        required
      />

      <label htmlFor="habitCategory">Habit Category:</label>
      <Input
        type="text"
        placeholder="Enter habit category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />

      <HabitFrequencySelector
        frequency={frequencyType}
        setFrequency={setFrequencyType}
        customDays={customDays}
        setCustomDays={setCustomDays}
      />

      <CustomColorPicker selectedColor={color} onSelectColor={setColor} />
      
      <Button type="submit">Save Changes</Button>
    </Form>
  );
}
