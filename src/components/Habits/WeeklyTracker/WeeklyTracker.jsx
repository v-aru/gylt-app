import React from 'react';
import { WeekProgress } from './WeeklyTrackerStyles';
import HabitList from '../HabitList/HabitList';

// WeeklyTracker component
const WeeklyTracker = ({ habits }) => (
  <HabitList 
    habits={habits} 
    renderItem={(habit) => (
      <>
        <div>{habit.habitName}</div>
        <WeekProgress weeklyCompletion={habit.weeklyCompletion} />
      </>
    )}
  />
);

export default WeeklyTracker;
