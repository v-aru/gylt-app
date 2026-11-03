import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  flex-shrink: 0;

  svg {
    transform: rotate(-90deg);
  }

  circle {
    fill: none;
    stroke-linecap: round;
  }

  .track {
    stroke: #e6e6f0;
  }

  .bar {
    stroke: ${({ $complete }) => ($complete ? "var(--success)" : "var(--accent)")};
    transition: stroke-dashoffset 0.6s cubic-bezier(0.3, 0.8, 0.3, 1), stroke 0.3s ease;
  }
`;

const Label = styled.span`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: ${({ $size }) => Math.round($size / 4.2)}px;
  color: var(--primary);
`;

export default function ProgressRing({ done, total, size = 64, stroke = 7 }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const ratio = total ? done / total : 0;

  return (
    <Wrapper $size={size} $complete={total > 0 && done === total} role="img" aria-label={`${done} of ${total} done`}>
      <svg width={size} height={size}>
        <circle className="track" cx={size / 2} cy={size / 2} r={radius} strokeWidth={stroke} />
        <circle
          className="bar"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - ratio)}
        />
      </svg>
      <Label $size={size}>
        {done}/{total}
      </Label>
    </Wrapper>
  );
}
