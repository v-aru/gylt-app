import styled from 'styled-components';

export const HabitItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const HabitName = styled.span`
  font-size: 1.2rem;
`;

export const HabitCheckbox = styled.input`
  width: 20px;
  height: 20px;
`;