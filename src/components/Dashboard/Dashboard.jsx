// src/components/Dashboard.js
import React, { useContext } from 'react';
import { DashboardContainer, HabitCard, HabitTitle, HabitDescription, HabitProgress } from './DashboardStyles';
import { HabitsContext } from '@/context/HabitsContext';

const Dashboard = () => {
    const { habits, isLoading } = useContext(HabitsContext);
    if (isLoading) return <p>Loading...</p>;

    const calculateProgress = (habit) => {
        // Logic to calculate progress for the habit
        // For example, you could base it on the completion status and frequency
        
        const completedCount = habit.completed ? 1 : 0; // 1 if completed, otherwise 0
        const totalCount = 1; // You can adjust this based on the frequency

        // Example: If daily, we could assume 30 days in a month
        const frequencyMultiplier = habit.frequency === 'daily' ? 30 : 1; // Adjust as necessary for other frequencies

        return Math.round((completedCount / frequencyMultiplier) * 100);
    };

    return (
        <DashboardContainer>
            {habits.length > 0 ? (
                habits.map((habit) => {
                    const progress = calculateProgress(habit);
                    return (
                        <HabitCard key={habit._id}>
                            <HabitTitle>{habit.habitName}</HabitTitle>
                            <HabitDescription>{habit.description}</HabitDescription>
                            <HabitProgress>
                                Progress: {progress}%
                            </HabitProgress>
                        </HabitCard>
                    );
                })
            ) : (
                <p>No habits found. Start adding some habits!</p>
            )}
        </DashboardContainer>
    );
};

export default Dashboard;
