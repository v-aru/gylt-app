import React from 'react';
import { DashboardContainer, SectionCard, SectionTitle } from './DashboardStyles';
import DashboardHabitList from './DashboardHabitList';
import DashboardToDoList from './DashboardToDoList';
import DashboardSubscriptionList from './DashboardSubscriptionList';

const Dashboard = () => {
    return (
        <DashboardContainer>
            <SectionCard>
                <SectionTitle>To-Dos for the Day</SectionTitle>
                <DashboardToDoList />
            </SectionCard>
            <SectionCard>
                <SectionTitle>Habits</SectionTitle>
                <DashboardHabitList />
            </SectionCard>
            <SectionCard>
                <SectionTitle>Subscriptions</SectionTitle>
                <DashboardSubscriptionList />
            </SectionCard>
        </DashboardContainer>
    );
};

export default Dashboard;
