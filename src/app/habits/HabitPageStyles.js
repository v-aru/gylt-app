import styled from "styled-components";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

export const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 40px;
  // background-color: #D5C6E0;
`;

export const PageHeader = styled.div`
  background-color: purple;
  color: white;
  font-size: 32px;
  text-align: center;
  margin-bottom: 20px;
  border: none;
  border-radius: 8px;
  font-family: "Qwitcher Grypen", serif;
  font-weight: 700;
  font-style: normal;
`;

// const AddHabitButton = styled.button`
//   margin-top: 20px;
//   padding: 10px 20px;
//   background-color: #4caf50;
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;

//   &:hover {
//     background-color: #45a049;
//   }
// `;

// Flexbox container to align the calendar and the habit list side by side

export const ListHeader = styled.div`
  background-color: #989FCE;
  color: black;
  font-size: 28px;
  text-align: center;
  margin-bottom: 20px;
  font-family: "Allura", cursive;
  font-weight: 400;
  font-style: normal;
`;

export const HabitsSection = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 30px;
  margin-top: 40px;
`;

export const StyledHabitListSection = styled.section`
  // background-color: #e5e5e5; /* Custom background */
  // background-color: #5C5470;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
  width: 50%;
`;