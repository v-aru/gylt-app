import styled from "styled-components";
import { liftOnHover, pop } from "../../../styles/animations";

export const PageTitle = styled.h1`
  font-size: 2rem;
  color: var(--primary);
  text-align: center;
  margin: 10px 0 20px;
`;

export const Card = styled.section`
  background-color: var(--card);
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  padding: 20px;
  ${liftOnHover}
`;

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  color: var(--primary);
  margin-bottom: 12px;
`;

export const Button = styled.button`
  padding: 10px 18px;
  background-color: ${({ $variant }) => ($variant === "danger" ? "var(--danger)" : $variant === "secondary" ? "#e1dee9" : "#3c096c")};
  color: ${({ $variant }) => ($variant === "secondary" ? "#3c096c" : "white")};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.15s ease;

  &:hover {
    opacity: 0.9;
  }

  &:active:not(:disabled) {
    transform: scale(0.97);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const FloatingButton = styled(Button)`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 900;
  background-color: #3b185f;
  border-radius: 999px;
  padding: 12px 22px;
  box-shadow: 0 6px 16px rgba(59, 24, 95, 0.35);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    opacity: 1;
    transform: translateY(-2px);
    box-shadow: 0 10px 22px rgba(59, 24, 95, 0.4);
  }

  &:active {
    animation: ${pop} 0.3s ease;
  }
`;

export const ErrorText = styled.p`
  color: var(--danger);
  margin: 10px 0;
`;

export const MutedText = styled.p`
  color: var(--muted);
`;
