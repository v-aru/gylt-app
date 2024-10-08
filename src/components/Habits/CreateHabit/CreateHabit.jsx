import { useState } from 'react';
import { Form, Input, Button, HabitFrequencySelector } from './CreateHabitStyles';
import { CustomColorPicker } from '@/components/ColorPicker/ColorPicker';

export default function CreateHabit({ onSubmit }) {
  const [habitName, setHabitName] = useState('');
  const [category, setCategory] = useState('');
  const [frequencyType, setFrequencyType] = useState('Daily');
  const [color, setColor] = useState('#000000');
  const [customDays, setCustomDays] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const frequency = frequencyType === 'Custom' ? 'custom' : frequencyType.toLowerCase();

    if (habitName && category) {
      onSubmit({
        habitName,
        category,
        frequency,
        color,
        customDays: frequency === 'custom' ? customDays : [],
        days: frequency === 'custom' ? customDays : []
      });
      setHabitName('');
      setCategory('');
      setFrequencyType('daily');
      setColor('#000000');
      setCustomDays([]);
    }
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
      
      <Button type="submit">Create Habit</Button>
    </Form>
  );
}
