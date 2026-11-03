import styled from "styled-components";
import { shimmer } from "../../../styles/animations";

const Bar = styled.div`
  height: ${({ $height }) => $height}px;
  width: ${({ $width }) => $width};
  border-radius: 10px;
  background: linear-gradient(90deg, #e6e4ec 25%, #f3f1f7 50%, #e6e4ec 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.4s ease-in-out infinite;
`;

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

// Placeholder rows shown while data loads, shaped like the list they replace.
export default function SkeletonList({ rows = 3, height = 56 }) {
  return (
    <Stack aria-busy="true" aria-label="Loading">
      {Array.from({ length: rows }, (_, index) => (
        <Bar key={index} $height={height} $width={index === rows - 1 ? "70%" : "100%"} />
      ))}
    </Stack>
  );
}
