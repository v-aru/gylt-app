import styled from "styled-components";

const Button = styled.button`
  background-color: #3B185F;
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
    background-color: #B6A6CA;
  }
`;

export default function AddHabitButton({ onClick }) {
  return <Button onClick={onClick}>+ Add Habit</Button>;
}
