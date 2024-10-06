import styled from "styled-components";

export const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
`;

export const Select = styled.select`
  padding: 2px;
  margin-left: 5px;
  margin-bottom: 10px;
`;

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr); /* 6 columns */
  gap: 10px; /* Spacing between colors */
  margin: 10px 0;
`;

const ColorCircle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  cursor: pointer;
  border: 2px solid transparent;
  transition: border 0.3s;

  &:hover {
    border: 2px solid #000; /* Highlight on hover */
  }
`;

export const CustomColorPicker = ({ selectedColor, onSelectColor }) => {
  return (
    <ColorGrid>
      {colors.map((color) => (
        <ColorCircle
          key={color}
          color={color}
          onClick={() => onSelectColor(color)}
          style={{
            border: selectedColor === color ? '2px solid #000' : '2px solid transparent'
          }}
        />
      ))}
    </ColorGrid>
  );
};


export const Button = styled.button`
  padding: 10px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: #005bb5;
  }
`;

const DaysButton = styled.button.attrs({ type: 'button' })`
  padding: 5px 10px;
  margin: 5px;
  background-color: ${(props) => (props.selected ? '#B6A6CA' : '#f0f0f0')};
  color: ${(props) => (props.selected ? 'white' : '#000')};
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.selected ? '#B6A6CA' : '#dcdcdc')};
  }
`;

export const HabitFrequencySelector = ({ frequency, setFrequency, customDays, setCustomDays }) => {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <>
      <div>
        <label>Frequency:</label>
        <Select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="custom">Custom</option>
        </Select>
      </div>

      {frequency === 'custom' && (
        <div>
          <p>Select days:</p>
          {daysOfWeek.map((day) => (
            <DaysButton
              key={day}
              selected={customDays.includes(day)}
              onClick={(e) =>{
                e.stopPropagation();
                setCustomDays(
                  customDays.includes(day)
                    ? customDays.filter((d) => d !== day)
                    : [...customDays, day]
                );
              }}
            >
              {day}
            </DaysButton>
          ))}
        </div>
      )}
    </>
  );
};