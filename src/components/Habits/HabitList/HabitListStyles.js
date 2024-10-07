import styled from "styled-components";

export const HabitItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  margin-top: 15px;
  margin-bottom: 15px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

export const HabitName = styled.span`
  font-size: 1.2rem;
  color: black;
`;

export const HabitCheckbox = styled.input`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  accent-color: #ACACDE;
`;

export const HabitDetails = styled.div`
  display: flex;
  flex-direction: column;
`;