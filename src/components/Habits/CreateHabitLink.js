import styled from "styled-components";
import Link from "next/link";

const CreateHabitButton = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #0070f3;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  text-align: center;

  &:hover {
    background-color: #005bb5;
  }
`;

export default function CreateHabitLink() {
  return (
    <CreateHabitButton href="/create-habit">
      + Add New Habit
    </CreateHabitButton>
  );
}
