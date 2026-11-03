import styled from "styled-components";
import { pop, staggered } from "../../../../styles/animations";

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
  background-color: ${({ $done }) => ($done ? "#eceaf1" : "#dfe0e2")};
  border-left: 6px solid ${({ $color }) => $color};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
  ${({ $index }) => staggered($index)}

  &:hover {
    transform: translateX(3px);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.12);
  }
`;

export const HabitDetails = styled.button`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
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
  color: ${({ $completed }) => ($completed ? "#888" : "#000")};
  /* Animated strike-through that draws across the name. */
  background-image: linear-gradient(currentColor, currentColor);
  background-repeat: no-repeat;
  background-position: 0 55%;
  background-size: ${({ $completed }) => ($completed ? "100% 2px" : "0% 2px")};
  transition: background-size 0.35s ease, color 0.3s ease;
  align-self: flex-start;
`;

export const HabitMeta = styled.span`
  font-size: 0.85rem;
  color: var(--muted);
`;

export const Streak = styled.span`
  flex-shrink: 0;
  padding: 2px 8px;
  border-radius: 999px;
  background-color: #fff1e0;
  color: #b4560a;
  font-size: 0.8rem;
  font-weight: 700;
  white-space: nowrap;
`;

export const HabitCheckbox = styled.input`
  appearance: none;
  flex-shrink: 0;
  width: 26px;
  height: 26px;
  border: 2px solid ${({ $color }) => $color};
  border-radius: 50%;
  background-color: white;
  cursor: pointer;
  position: relative;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &::after {
    content: "";
    position: absolute;
    left: 7px;
    top: 3px;
    width: 7px;
    height: 12px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg) scale(0);
    transition: transform 0.2s ease;
  }

  &:checked {
    background-color: #7b2cbf;
    border-color: #7b2cbf;
    animation: ${pop} 0.35s ease;
  }

  &:checked::after {
    transform: rotate(45deg) scale(1);
  }

  &:hover:not(:disabled) {
    box-shadow: 0 0 0 4px rgba(123, 44, 191, 0.15);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
