import styled from "styled-components";

export const CalendarBarContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 15px 10px;
  gap: 10px;
  background-color: #ced3dc;
  border-radius: 8px;
  border: 2px solid #d3d3e1;
  width: 100%;
  margin: 0 auto 20px;
`;

export const MonthLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
  color: var(--primary);
`;

export const TodayButton = styled.button`
  border: 1px solid var(--primary);
  background: white;
  color: var(--primary);
  border-radius: 12px;
  padding: 2px 10px;
  font-size: 0.8rem;
  cursor: pointer;
`;

export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
`;

export const CalendarDaysContainer = styled.div`
  display: flex;
  flex: 1;
  max-width: 420px;
  gap: 4px;
  align-items: center;
  justify-content: space-between;
`;

export const DayContainer = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-width: 0;
  max-width: 52px;
  padding: 5px 0;
  border: 2px solid ${({ $isToday }) => ($isToday ? "#5c469c" : "transparent")};
  border-radius: 8px;
  background-color: ${({ $isSelected }) => ($isSelected ? "#fcf7f8" : "transparent")};
  font-weight: ${({ $isSelected }) => ($isSelected ? "bold" : "normal")};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f4fc;
  }
`;

export const DayLabel = styled.span`
  font-weight: bold;
  font-size: 0.85em;
`;

export const DateLabel = styled.span`
  font-size: 1em;
  margin-top: 0.2rem;
`;

export const NavigationButton = styled.button`
  display: flex;
  background-color: #1d267d;
  color: white;
  border: none;
  border-radius: 50%;
  flex-shrink: 0;
  padding: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5c469c;
  }
`;
