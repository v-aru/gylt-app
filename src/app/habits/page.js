"use client";
import '../../../styles/globals.css';
import React, { useState, useEffect } from 'react';
import { Container, StyledCalendarContainer, StyledCalendar, PageHeader, ListHeader, StyledHabitListSection, CalendarButtons, HabitsSection } from './HabitPageStyles';
import HabitList from '../../components/Habits/HabitList/HabitList';
import AddHabitButton from '@/components/Habits/CreateHabit/AddHabitButton';
import CreateHabit from '@/components/Habits/CreateHabit/CreateHabit';
import EditHabit from '@/components/Habits/EditHabit/EditHabit';
import Modal from '@/components/Modal/Modal';
import { CustomColorPicker } from '../../components/ColorPicker/ColorPicker';
import { Quotes } from '../../../public/positiveQuotes';
import { QuotesSection } from './QuotesSectionStyles';


export default function HabitsPage() {
  const [habits, setHabits] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);
  const [date, setDate] = useState(new Date());
  const [randomQuote, setRandomQuote] = useState({});
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [selectedColor, setSelectedColor] = useState(null); 
  const [selectedColorAllHabits, setSelectedColorAllHabits] = useState(null); 
  const [selectedColorDayHabits, setSelectedColorDayHabits] = useState(null); 

  useEffect(() => {
    // Pick a random quote when the component renders
    const randomIndex = Math.floor(Math.random() * Quotes.length);
    setRandomQuote(Quotes[randomIndex]);
  }, []);

  const addHabit = async (newHabit) => {
    const habitToAdd = {
      habitName: newHabit.habitName,
      id: Date.now(),
      days: newHabit.days || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      customDays: newHabit.frequency === 'custom' ? newHabit.customDays : [],
      date: date.toISOString().split('T')[0],
      frequency: newHabit.frequency || 'Daily',
      completed: false,
      color: newHabit.color || '#000000',
    };
    // setHabits((prevHabits) => [...prevHabits, habitToAdd]);
    // setIsModalOpen(false);
    try {
      const response = await fetch('http://localhost:5002/habits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(habitToAdd),
      });

      console.log("response: ", response);
      if (!response.ok) {
        throw new Error('Failed to add habit');
      }
  
      const data = await response.json();
      setHabits((prevHabits) => [...prevHabits, data]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding habit:', error);
    }
  };

  const editHabit = (updatedHabit) => {
    setHabits(habits.map(habit => 
      habit.id === updatedHabit.id ? updatedHabit : habit
    ));
    setIsModalOpen(false);
    setIsEditing(false); // Reset editing state
    setEditingHabit(null); // Clear the habit being edited
  };

  const handleEditClick = (habit) => {
    setEditingHabit(habit); // Set the habit to be edited
    setIsEditing(true); // Set editing mode
    setIsModalOpen(true); // Open the modal
  };


  const handleDayClick = (value) => {
    setDate(value);
    setActiveStartDate(value); 
  };

  const handleToday = () => {
    const today = new Date();
    setDate(today); 
    setActiveStartDate(today);
  };

  const handleYesterday = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); 
    setDate(yesterday); 
    setActiveStartDate(yesterday);
  };

  const handleTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);  
    setDate(tomorrow);
    setActiveStartDate(tomorrow);
  };

  const getHabitsForDate = (selectedDate) => {
    const selectedDay = selectedDate.toLocaleDateString('en-us', { weekday: 'short' });
    const selectedMonthDay = selectedDate.getDate();
    const selectedDayIndex = selectedDate.getDay();
    const currentMonth = selectedDate.getMonth();
    const currentYear = selectedDate.getFullYear();

    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); 

    return habits.filter((habit) => {
      if (habit.frequency === 'daily') {
        return true;
      }

      if (habit.frequency === 'weekly') {
        return selectedDayIndex === 6;
      }

      if (habit.frequency === 'monthly') {
        return selectedMonthDay === lastDayOfMonth;
      }

      if (habit.frequency === 'custom') return habit.customDays.includes(selectedDay);
      
      return false;
    });
  };

  const selectedHabits = getHabitsForDate(date);

  const filteredHabits = selectedColor ? selectedHabits.filter(habit => habit.color === selectedColor) : selectedHabits;

  const toggleHabit = (id) => {
    setHabits(habits.map((habit) => 
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ));
  };

  return (
    <>
    <Container>
      <PageHeader>&nbsp;H&nbsp;A&nbsp;B&nbsp;I&nbsp;T&nbsp;S&nbsp;</PageHeader>

      {/* Quotes Section */}
      <QuotesSection>
          <blockquote>
            {randomQuote.quote}
            <footer>- {randomQuote.author}</footer>
          </blockquote>
      </QuotesSection>

      <StyledCalendarContainer>
          <StyledCalendar
            onChange={handleDayClick}
            value={date}
            activeStartDate={activeStartDate}
            onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate)} 
          />

          {/* Buttons for Yesterday, Today, Tomorrow */}
          <CalendarButtons>
            <button onClick={handleYesterday}>Yesterday</button>
            <button onClick={handleToday}>Today</button>
            <button onClick={handleTomorrow}>Tomorrow</button>
          </CalendarButtons>
      </StyledCalendarContainer>
      
      
      <HabitsSection>    
          <StyledHabitListSection>
            <ListHeader>&nbsp;a&nbsp;l&nbsp;l&nbsp;&nbsp;&nbsp;h&nbsp;a&nbsp;b&nbsp;i&nbsp;t&nbsp;s&nbsp;</ListHeader>
            <div>
              <CustomColorPicker selectedColor={selectedColorAllHabits} onSelectColor={setSelectedColorAllHabits} />
            </div>
            <HabitList habits={habits} onToggleHabit={toggleHabit} onEditHabit={handleEditClick} />
          </StyledHabitListSection>
        
         <StyledHabitListSection>
            <ListHeader>&nbsp;H&nbsp;a&nbsp;b&nbsp;i&nbsp;t&nbsp;s&nbsp;&nbsp;&nbsp;f&nbsp;o&nbsp;r&nbsp;&nbsp;&nbsp;t&nbsp;h&nbsp;e&nbsp;&nbsp;&nbsp;d&nbsp;a&nbsp;y&nbsp;</ListHeader>
            <div>
              <CustomColorPicker selectedColor={selectedColorDayHabits} onSelectColor={setSelectedColorDayHabits} />
            </div>
            <HabitList habits={filteredHabits} onToggleHabit={toggleHabit} onEditHabit={handleEditClick} />
          </StyledHabitListSection>
      </HabitsSection>

      <AddHabitButton onClick={() => {
        setIsEditing(false); 
        setIsModalOpen(true);
      }} />
        
      {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            {isEditing ? (
              <EditHabit habit={editingHabit} onSubmit={editHabit} />
            ) : (
              <CreateHabit onSubmit={addHabit} />
            )}
          </Modal>
        )}
    </Container>
    </>
  );
}