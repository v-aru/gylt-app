"use client";
import { useState } from 'react';
import HabitList from '../../components/Habits/HabitList';
import CreateHabitLink from '../../components/Habits/CreateHabitLink';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 20px;
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

export default function HabitsPage() {
  const [habits, setHabits] = useState([
    { id: 1, name: "Drink 3L of water", frequency: "Daily" },
    { id: 2, name: "Gym 3x a week", frequency: "Weekly" },
    { id: 3, name: "Read 10 pages", frequency: "Daily" },
  ]);

  return (
    <Container>
      <Header>Habit Tracker</Header>
      <HabitList habits={habits} />
      <CreateHabitLink />
      {/* <AddHabitButton>Add a New Habit</AddHabitButton> */}
    </Container>
  );
}
