import styled from "styled-components";

// HabitItem styled container
export const HabitItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 1em 0;
  padding: 1em;
  border-bottom: 1px solid #e0e0e0;
`;

// HabitName component
export const HabitName = ({ children }) => (
  <h3 style={{ fontSize: '1em', margin: '0 0 0.5em 0', color: '#333' }}>
    {children}
  </h3>
);

// WeekProgress component
export const WeekProgress = ({ weeklyCompletion = [] }) => (
  <div style={{ display: 'flex', gap: '8px' }}>
    {Array.isArray(weeklyCompletion) &&
      weeklyCompletion.map((isCompleted, index) => (
      <DayMarker key={index} isCompleted={isCompleted} />
    ))}
  </div>
);

// DayMarker styled component
export const DayMarker = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ isCompleted }) => (isCompleted ? '#4caf50' : '#e0e0e0')};
`;