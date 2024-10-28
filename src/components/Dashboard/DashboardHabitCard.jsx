import React from 'react';
import { HabitCard, HabitTitle, HabitDescription, HabitProgress } from './DashboardStyles';

const DashboardHabitCard = ({ habit }) => {
    const calculateProgress = (habit) => {
        const completedCount = habit.completed ? 1 : 0; 
        const totalCount = 1; 
        const frequencyMultiplier = habit.frequency === 'daily' ? 30 : 1; 
        return Math.round((completedCount / frequencyMultiplier) * 100);
    };

    const progress = calculateProgress(habit);

    return (
        <HabitCard>
            <HabitTitle>{habit.habitName}</HabitTitle>
            <HabitDescription>{habit.description}</HabitDescription>
            <HabitProgress>
                Progress: {progress}%
            </HabitProgress>
        </HabitCard>
    );
};

export default DashboardHabitCard;
