import styled from 'styled-components';

export const CalendarBarContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  // margin-top: 15px;
  justify-content: center;
  padding: 15px 20px;
  gap: 15px;
  background-color: #CED3DC;
  border-radius: 8px;
  border: 2px solid #D3D3E1;
  width: 80%;
  margin: 0 auto;
`;

export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 40px;
`;

export const CalendarDaysContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const DayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40px;
  padding: 5px;
  border-radius: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f4fc; /* Light background on hover */
    cursor: pointer;
  }

  &:active {
    background-color: #FCF7F8; /* Different background on active state */
  }

  /* Active styling if this component is selected */
  ${({ isSelected }) =>
    isSelected &&
    `
      background-color: #FCF7F8;
      font-weight: bold;
    `}
`;


export const DayLabel = styled.div`
  font-weight: bold;
  font-size: 0.9em;
  text-align: center;
`;

export const DateLabel = styled.div`
  font-size: 1em;
  text-align: center;
  margin-top: 0.2rem;
`;

// Container for navigation buttons (e.g., Previous and Next)
export const NavigationButton = styled.button`
  background-color: #1D267D;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 8px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5C469C;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(92, 70, 156, 0.6);
  }
`;