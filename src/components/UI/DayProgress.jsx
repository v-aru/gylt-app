import styled from "styled-components";
import ProgressRing from "./ProgressRing";
import { pop } from "../../../styles/animations";

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 14px;
`;

const Message = styled.p`
  font-weight: 600;
  color: ${({ $complete }) => ($complete ? "var(--success)" : "var(--muted)")};

  span {
    display: inline-block;
    margin-right: 6px;
    animation: ${pop} 0.5s ease;
  }
`;

function encouragement(done, total) {
  if (done === total) return "All done. Nice work!";
  if (done === 0) return "Let's get started.";
  if (done / total >= 0.5) return `Almost there: ${total - done} to go.`;
  return `${total - done} still to go.`;
}

export default function DayProgress({ done, total }) {
  if (!total) return null;
  const complete = done === total;

  return (
    <Row>
      <ProgressRing done={done} total={total} />
      <Message $complete={complete}>
        {/* Re-keyed so the emoji pops each time the day is completed. */}
        {complete && <span key={`done-${total}`}>🎉</span>}
        {encouragement(done, total)}
      </Message>
    </Row>
  );
}
