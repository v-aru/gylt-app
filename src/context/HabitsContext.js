// src/context/HabitsContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

export const HabitsContext = createContext();

export const HabitsProvider = ({ children }) => {
  const { data: session } = useSession();
  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserHabits = async () => {
    console.log(session);
    if (!session) return;
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/habits`, {
        params: { userId: session.user.id },
      });
      console.log('API Response:', response.data);
      setHabits(response.data);
    } catch (error) {
      console.error('Error fetching habits:', error);
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchUserHabits();
    }
  }, [session]);

  return (
    <HabitsContext.Provider value={{ habits, isLoading }}>
      {children}
    </HabitsContext.Provider>
  );
};
