import styled from "styled-components";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

export const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 20px;
  // background-color: #D5C6E0;
`;

export const PageHeader = styled.div`
  background-color: purple;
  color: white;
  font-weight: bold;
  font-size: 32px;
  text-align: center;
  margin-bottom: 20px;
  border: none;
  border-radius: 8px;
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

export const StyledCalendarContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
  gap: 5px;
`;

export const CalendarButtons = styled.div`
  display: flex;
  justify-content: space-around;
  align-content: center;
  flex-wrap: wrap;
  width: 40%;
  gap: 10px; 
  margin: 0 auto; 
  
  button {
    background-color: #1D267D; /* Green background */
    color: white; /* White text */
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #5C469C; /* Darker green on hover */
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.5); /* Focus shadow */
    }
  }

`;

export const StyledCalendar = styled(Calendar)`
  background-color: #B9B8D3;
  border-radius: 8px;
  border: 2px solid purple;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0 auto;

  .react-calendar__navigation {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    gap: 5px;

    button {
      background-color: #1F5673;
      color: white;
      border: none;
      border-radius: 5px;
      width: 40px;
      height: 40px;
      font-weight: bold;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    button:hover {
      background-color: #005bb5;
    }
  }

  .react-calendar__month-view__weekdays {
    font-weight: bold;
    text-transform: uppercase;
    color: #006989;
  }

  .react-calendar__tile {
    background-color: white;
    border-radius: 50%;
    // padding: 15px;
    transition: background-color 0.2s ease;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    &:enabled:hover {
      background-color: #90C3C8;
    }

    &--active {
      background-color: #759FBC;
      color: white;
    }

    &--now {
      background-color: #E8ADB6;
      color: #b91c1c;
    }
  }
`;

export const ListHeader = styled.div`
  background-color: purple;
  color: white;
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
  border: none;
  border-radius: 8px;
`;

export const HabitsSection = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 30px;
  margin-top: 40px;
`;

export const StyledHabitListSection = styled.section`
  background-color: #f9f9f9; /* Custom background */
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
  width: 50%;
`;