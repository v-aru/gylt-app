"use client";
import { useState } from 'react';
import HabitList from '../../components/Habits/HabitList';
import styled from 'styled-components';
import AddHabitButton from '@/components/Habits/CreateHabit/AddHabitButton';
import CreateHabit from '@/components/Habits/CreateHabit/CreateHabit';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import Modal from '@/components/Modal/Modal';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
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

const StyledCalendarContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
`;

const HabitListContainer = styled.div`
  margin-top: 30px;
`;

const StyledCalendar = styled(Calendar)`
  max-width: 100%;
  background-color: #B9B8D3;
  border-radius: 8px;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

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

const PageHeader = styled.div`
  background-color: purple;
  color: white;
  font-weight: bold;
  font-size: 32px;
  text-align: center;
  margin-bottom: 20px;
  border: none;
  border-radius: 8px;
`;

const ListHeader = styled.div`
  background-color: purple;
  color: white;
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
  border: none;
  border-radius: 8px;
`;

export default function HabitsPage() {
  const [habits, setHabits] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedHabits, setSelectedHabits] = useState([]);

  const addHabit = (newHabit) => {
    setHabits([...habits, { ...newHabit, id: Date.now() }]);
    setIsModalOpen(false);
  };

  const handleDayClick = (value) => {
    // Assuming you have a function to get habits for a selected date
    const habitsForSelectedDay = getHabitsForDate(value);
    setSelectedHabits(habitsForSelectedDay);
  };

  const getHabitsForDate = (date) => {
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });
    return habits.filter(habit => habit.days.includes(day));
  };

  const toggleHabit = (id) => {
    setHabits(habits.map((habit) => 
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ));
  };

  return (
    <>
    <Container>
      <PageHeader>&nbsp;H&nbsp;A&nbsp;B&nbsp;I&nbsp;T&nbsp;S&nbsp;</PageHeader>
        <StyledCalendarContainer>
          <StyledCalendar
            onChange={setDate}
            value={date}
            onClickDay={handleDayClick}
          />
        </StyledCalendarContainer>

        <HabitListContainer>
          <ListHeader>&nbsp;H&nbsp;A&nbsp;B&nbsp;I&nbsp;T&nbsp;&nbsp;&nbsp;L&nbsp;I&nbsp;S&nbsp;T&nbsp;</ListHeader>
          <HabitList habits={habits} onToggleHabit={toggleHabit} />
        </HabitListContainer>

      <AddHabitButton onClick={() => setIsModalOpen(true)} />
        
      {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <CreateHabit onSubmit={addHabit} />
          </Modal>
        )}
    </Container>
    </>
  );
}