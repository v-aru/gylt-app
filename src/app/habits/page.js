"use client";
import { useState } from 'react';
import { Container, StyledCalendarContainer, StyledCalendar, HabitListContainer, PageHeader, ListHeader } from './HabitPageStyles';
import HabitList from '../../components/Habits/HabitList/HabitList';
import AddHabitButton from '@/components/Habits/CreateHabit/AddHabitButton';
import CreateHabit from '@/components/Habits/CreateHabit/CreateHabit';
import Modal from '@/components/Modal/Modal';


export default function HabitsPage() {
  const [habits, setHabits] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState(new Date());


  const addHabit = (newHabit) => {
    const habitToAdd = {
      habitName: newHabit.habitName,
      id: Date.now(),
      days: newHabit.days || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      customDays: newHabit.frequency === 'custom' ? newHabit.customDays : [],
      date: date.toISOString().split('T')[0],
      frequency: newHabit.frequency || 'Daily',
      completed: false,
    };
    setHabits((prevHabits) => [...prevHabits, habitToAdd]);
    setIsModalOpen(false);
  };

  const handleDayClick = (value) => {
    setDate(value);
  };

  const getHabitsForDate = (selectedDate) => {
    const selectedDay = selectedDate.toLocaleDateString('en-us', { weekday: 'short' });
    const selectedMonthDay = selectedDate.getDate();
    return habits.filter((habit) => {
      if (habit.frequency === 'daily') return true;
      if (habit.frequency === 'weekly') return habit.days.includes(selectedDay);
      if (habit.frequency === 'monthly') return habit.days.includes(selectedMonthDay);
      if (habit.frequency === 'custom') return habit.customDays.includes(selectedDay);
      return false;
    });
  };

  const toggleHabit = (id) => {
    setHabits(habits.map((habit) => 
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ));
  };

  const selectedHabits = getHabitsForDate(date);

  return (
    <>
    <Container>
      <PageHeader>&nbsp;H&nbsp;A&nbsp;B&nbsp;I&nbsp;T&nbsp;S&nbsp;</PageHeader>
        <StyledCalendarContainer>
          <StyledCalendar
            onChange={(value) => {
              setDate(value);
              handleDayClick(value);
            }}
            value={date}
          />
        </StyledCalendarContainer>

        <HabitListContainer>
          <ListHeader>&nbsp;H&nbsp;A&nbsp;B&nbsp;I&nbsp;T&nbsp;&nbsp;&nbsp;L&nbsp;I&nbsp;S&nbsp;T&nbsp;</ListHeader>
          <HabitList habits={selectedHabits} onToggleHabit={toggleHabit} />
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