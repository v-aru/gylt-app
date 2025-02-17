import React, { useContext, useState, useEffect } from 'react';
import { DashboardContainer, SectionCard, SectionTitle } from './DashboardStyles';
import DashboardHabitList from './DashboardHabitList';
import DashboardToDoList from './DashboardToDoList';
import DashboardSubscriptionList from './DashboardSubscriptionList';
import DashboardCalendar from './DashboardCalendar';
import { HabitsContext } from '@/context/HabitsContext';
import { Quotes } from '../../../public/positiveQuotes';
import { QuotesSection } from '../../../styles/QuotesSectionStyles';

const Dashboard = () => {
    const habitsContext = useContext(HabitsContext);
    const [randomQuote, setRandomQuote] = useState({});

    useEffect(() => {
        // Pick a random quote when the component renders
        const randomIndex = Math.floor(Math.random() * Quotes.length);
        setRandomQuote(Quotes[randomIndex]);
      }, []);
    
      if (!habitsContext) {
        return null; 
    }

    const { habits } = habitsContext;

    return (
        <DashboardContainer>
            {/* Quotes Section */}
            <QuotesSection>
                <blockquote>
                    {randomQuote.quote}
                    <footer>- {randomQuote.author}</footer>
                </blockquote>
            </QuotesSection>
            
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
