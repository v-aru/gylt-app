import styled from "styled-components";
import { fadeUp } from "../../../styles/animations";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 8px;
  text-align: center;
  color: var(--muted);
  animation: ${fadeUp} 0.4s ease backwards;

  .emoji {
    font-size: 2rem;
  }

  button {
    margin-top: 6px;
    padding: 8px 16px;
    border: 2px dashed #b6a6ca;
    border-radius: 999px;
    background: none;
    color: var(--accent);
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #f3eefa;
    }
  }
`;

export default function EmptyState({ emoji, message, actionLabel, onAction }) {
  return (
    <Wrapper>
      {emoji && (
        <span className="emoji" aria-hidden="true">
          {emoji}
        </span>
      )}
      <p>{message}</p>
      {actionLabel && onAction && (
        <button type="button" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </Wrapper>
  );
}
