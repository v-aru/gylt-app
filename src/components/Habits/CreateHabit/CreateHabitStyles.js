import styled from "styled-components";

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

export const Button = styled.button`
  padding: 10px;
  background-color: #3c096c;
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
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: ${(props) => (props.selected ? '#B6A6CA' : '#dcdcdc')};
    transform: scale(1.05); 
  }
`;

const CustomDaysContainer = styled.div`
  margin: 0; // Remove any margin
  padding: 0; // Remove any padding
  display: flex; // Change display to flex for better alignment
  flex-direction: row; // Stack elements vertically
  gap: 5px; // Add a little gap between elements, adjust as needed
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
        <>
          <p style={{ margin: '0', padding: '0' }}>Select days:</p> 
            <CustomDaysContainer>
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
          </CustomDaysContainer>
        </>
      )}
    </>
  );
};