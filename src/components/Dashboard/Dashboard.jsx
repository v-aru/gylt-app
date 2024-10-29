import React, { useContext } from 'react';
import { DashboardContainer, SectionCard, SectionTitle } from './DashboardStyles';
import DashboardHabitList from './DashboardHabitList';
import DashboardToDoList from './DashboardToDoList';
import DashboardSubscriptionList from './DashboardSubscriptionList';
import DashboardCalendar from './DashboardCalendar';
import { HabitsContext } from '@/context/HabitsContext';

const Dashboard = () => {
    const habitsContext = useContext(HabitsContext);

    if (!habitsContext) {
        return null; 
    }

    const { habits } = habitsContext;

    return (
        <DashboardContainer>
            <SectionCard>
                {/* <SectionTitle>Calendar</SectionTitle> */}
                <DashboardCalendar />
            </SectionCard>
            <SectionCard>
                <SectionTitle>To-Dos for the Day</SectionTitle>
                <DashboardToDoList />
            </SectionCard>
            <SectionCard>
                <SectionTitle>Habits</SectionTitle>
                <DashboardHabitList habits={habits}/>
            </SectionCard>
            <SectionCard>
                <SectionTitle>Subscriptions</SectionTitle>
                <DashboardSubscriptionList />
            </SectionCard>
        </DashboardContainer>
    );
};

export default Dashboard;
