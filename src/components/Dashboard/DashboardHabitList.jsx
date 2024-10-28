import React, { useContext } from 'react';
import styled from 'styled-components';
import { HabitsContext } from '@/context/HabitsContext';
import DashboardHabitCard from './DashboardHabitCard';

const HabitListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    padding: 10px;
    background-color: #f3f3f3;
    border-radius: 8px;
`;

const DashboardHabitList = () => {
    const { habits, isLoading } = useContext(HabitsContext);
    if (isLoading) return <p>Loading...</p>;
    if (!habits || habits.length === 0) return <p>No habits for today!</p>;

    return (
        <HabitListContainer>
            {habits.map(habit => (
               <DashboardHabitCard key={habit._id} habit={habit} />
            ))}
        </HabitListContainer>
    );
};

export default DashboardHabitList;
