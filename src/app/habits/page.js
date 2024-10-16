"use client";
import '../../../styles/globals.css';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Container, StyledCalendarContainer, StyledCalendar, PageHeader, ListHeader, StyledHabitListSection, CalendarButtons, HabitsSection } from './HabitPageStyles';
import HabitList from '../../components/Habits/HabitList/HabitList';
import AddHabitButton from '@/components/Habits/CreateHabit/AddHabitButton';
import CreateHabit from '@/components/Habits/CreateHabit/CreateHabit';
import EditHabit from '@/components/Habits/EditHabit/EditHabit';
import Modal from '@/components/Modal/Modal';
import { CustomColorPicker } from '../../components/ColorPicker/ColorPicker';
import { Quotes } from '../../../public/positiveQuotes';
import { QuotesSection } from './QuotesSectionStyles';
import axios from 'axios';


export default function HabitsPage() {
  const { data: session, status } = useSession();
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
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserHabits = async () => {
    if (!session) {
      console.error('User is not authenticated');
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/habits`, {
          params: { userId: session ? session.user.id : undefined }
      });
      
      setHabits(response.data);
    } catch (error) {
      console.error('Error fetching habits:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Pick a random quote when the component renders
    const randomIndex = Math.floor(Math.random() * Quotes.length);
    setRandomQuote(Quotes[randomIndex]);
    const fetchHabits = async () => {
      if (session) {
        await fetchUserHabits();
      }
      setIsLoading(false);
    };
    fetchHabits();
  }, [session, status]);

  const addHabit = async (newHabit) => {
    const habitToAdd = {
      habitName: newHabit.habitName,
      category: newHabit.category,
      days: newHabit.days || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      customDays: newHabit.frequency === 'custom' ? newHabit.customDays : [],
      date: date.toISOString().split('T')[0],
      frequency: newHabit.frequency || 'Daily',
      completed: false,
      color: newHabit.color || '#000000',
      userId: session ? session.user.id : null,
    };
    try {
      const response = await fetch('/api/habits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.token}`,
        },
        body: JSON.stringify(habitToAdd),
      });

      const data = await response.json();
      setHabits((prevHabits) => [...prevHabits, data]);      
      if (!response.ok) {
        throw new Error('Failed to add habit');
      }
  
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding habit:', error);
    }
  };

  const editHabit = async (updatedHabit) => {
    try {
      const response = await fetch(`/api/habits/${updatedHabit._id}`, {
        method: 'PUT',
        headers: { 'Content-Type' : 'application/json'},
        body: JSON.stringify({
          habitName: updatedHabit.habitName,
          category: updatedHabit.category,
          days: updatedHabit.days,
          customDays: updatedHabit.customDays,
          frequency: updatedHabit.frequency,
          color: updatedHabit.color,
          completed: updatedHabit.completed,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json(); 
        console.error('Error updating habit:', errorData);
        throw new Error ('Failed to update habit!');
      }
      
      const data = await response.json();
      setHabits((prevHabits) => 
        prevHabits.map((habit) => 
          habit._id === updatedHabit._id ? data : habit
        )
      );

      await fetchUserHabits();
      setIsModalOpen(false);
      setIsEditing(false);
      setEditingHabit(null);
    } catch (error) {
      console.error('Error editing habit', error);
    }
  };

  const handleEditClick = (habit) => {
    setEditingHabit(habit);
    setIsEditing(true); 
    setIsModalOpen(true); 
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

      const habitStartDate = new Date(habit.startDate).setHours(0, 0, 0, 0);
      const selectedDateValue = selectedDate.setHours(0, 0, 0, 0);

      if (habitStartDate > selectedDateValue) {
        return false;
      }

      if (habit.frequency === 'daily') {
        return true;
      }

      if (habit.frequency === 'weekly') {
        return selectedDayIndex === 6;
      }

      if (habit.frequency === 'monthly') {
        return selectedMonthDay === lastDayOfMonth;
      }

      // if (habit.frequency === 'custom' && habit.customDays && Array.isArray(habit.customDays)) {
      //   return habit.customDays.includes(selectedDay);
      // }
      if (habit.frequency === 'custom' && Array.isArray(habit.days)) {
        return habit.days.includes(selectedDay); // Check if selectedDay is in the habit's custom days
    }
    
      return false;
    });
  };

  const selectedHabits = getHabitsForDate(date);

  const filteredAllHabits = selectedColorAllHabits ? habits.filter(habit => habit.color === selectedColorAllHabits) : habits;

  const filteredDayHabits = selectedColorDayHabits ? selectedHabits.filter(habit => habit.color === selectedColorDayHabits) : selectedHabits;

  const toggleHabit = async (habitId) => {
    const today = new Date().toISOString().split('T')[0]; 
    setHabits((prevHabits) =>
        prevHabits.map((habit) => {
            if (habit._id === habitId) {
                const isCompleted = habit.completedDates.includes(today);
                return {
                    ...habit,
                    completedDates: isCompleted
                        ? habit.completedDates.filter((date) => date !== today)
                        : [...habit.completedDates, today],
                    completed: !isCompleted,  // Update completed field directly
                };
            }
            return habit;
        })
    );

    try {
        const updatedHabit = habits.find(habit => habit._id === habitId);
        await axios.put(`/api/habits/${habitId}`, {
            completedDates: updatedHabit.completedDates,
            completed: !updatedHabit.completed, // Send the updated completed state
        });

    } catch (error) {
        console.error('Error updating habit in database:', error);
    }
};

  return (
    <>
    <Container>
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
            <HabitList habits={filteredAllHabits} onToggleHabit={toggleHabit} onEditHabit={handleEditClick} />
          </StyledHabitListSection>
        
         <StyledHabitListSection>
            <ListHeader>&nbsp;H&nbsp;a&nbsp;b&nbsp;i&nbsp;t&nbsp;s&nbsp;&nbsp;&nbsp;f&nbsp;o&nbsp;r&nbsp;&nbsp;&nbsp;t&nbsp;h&nbsp;e&nbsp;&nbsp;&nbsp;d&nbsp;a&nbsp;y&nbsp;</ListHeader>
            <div>
              <CustomColorPicker selectedColor={selectedColorDayHabits} onSelectColor={setSelectedColorDayHabits} />
            </div>
            <HabitList habits={filteredDayHabits} onToggleHabit={toggleHabit} onEditHabit={handleEditClick} />
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