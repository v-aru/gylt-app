import styled from "styled-components";

export const DashboardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
`;

export const HabitCard = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  width: 300px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }
`;

export const HabitTitle = styled.h2`
  font-size: 1.5rem;
  color: #1d267d;
`;

export const HabitDescription = styled.p`
  color: #333;
  margin: 10px 0;
`;

export const HabitProgress = styled.div`
  font-weight: bold;
  color: #4caf50; /* Green color for progress */
`;