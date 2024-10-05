import styled from "styled-components";

const Button = styled.button`
  background-color: #AAA1C8;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;

  &:hover {
    background-color: #45a049;
  }
`;

export default function AddHabitButton({ onClick }) {
  return <Button onClick={onClick}>+ Add Habit</Button>;
}
