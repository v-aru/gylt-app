import { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
`;

const Select = styled.select`
  padding: 10px;
  margin-bottom: 10px;
`;

const FrequencyWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  gap: 10px;

  input {
    width: 60px;
    gap: 10px;
  }
`;

const ColorPicker = styled.input`
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: #005bb5;
  }
`;

export default function CreateHabit({ onSubmit }) {
  const [habitName, setHabitName] = useState('');
  const [category, setCategory] = useState('');
  const [frequencyType, setFrequencyType] = useState('Daily');
  const [customFrequency, setCustomFrequency] = useState(1);
  const [timePeriod, setTimePeriod] = useState('day');
  const [color, setColor] = useState('#000000');

  const handleSubmit = (e) => {
    e.preventDefault();

    const frequency = frequencyType === 'Custom'
      ? `${customFrequency} times per ${timePeriod}`
      : frequencyType;


    if (habitName && category) {
      onSubmit({ habitName, category, frequency, color });
      setHabitName('');
      setCategory('');
      setFrequencyType('Daily');
      setColor('#000000');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Habit Name"
        value={habitName}
        onChange={(e) => setHabitName(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Habit Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <Select value={frequencyType} onChange={(e) => setFrequencyType(e.target.value)}>
        <option value="Daily">Daily</option>
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>
        <option value="Custom">Custom</option>
      </Select>

      {frequencyType === 'Custom' && (
        <FrequencyWrapper>
          <label>How many times: </label>
          <Input
            type="number"
            min="1"
            value={customFrequency}
            onChange={(e) => setCustomFrequency(e.target.value)}
          />
          <Select value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)}>
            <option value="day">day</option>
            <option value="week">week</option>
            <option value="month">month</option>
          </Select>
        </FrequencyWrapper>
      )}

      <ColorPicker
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <Button type="submit">Create Habit</Button>
    </Form>
  );
}
