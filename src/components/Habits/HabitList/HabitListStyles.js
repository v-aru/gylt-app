import styled from "styled-components";

export const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const HabitItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 15px;
  background-color: #dfe0e2;
  border-left: 6px solid ${({ $color }) => $color};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

export const HabitDetails = styled.button`
  display: flex;
  flex-direction: column;
  flex: 1;
  text-align: left;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;

  &:disabled {
    cursor: default;
  }
`;

export const HabitName = styled.span`
  font-size: 1.1rem;
  text-decoration: ${({ $completed }) => ($completed ? "line-through" : "none")};
  color: ${({ $completed }) => ($completed ? "#888" : "#000")};
`;

export const HabitMeta = styled.span`
  font-size: 0.85rem;
  color: var(--muted);
`;

export const HabitCheckbox = styled.input`
  width: 22px;
  height: 22px;
  accent-color: #7b2cbf;
  cursor: pointer;
`;
