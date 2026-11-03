import styled from "styled-components";

export const colors = ["#DF2E38", "#FFAD60", "#F6E96B", "#88D66C", "#03AED2", "#CAEDFF", "#ADA2FF", "#4F1787"];

const ColorGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  justify-content: center;
  align-items: center;
  margin: 15px 0;
  padding: 5px;
`;

const ColorCircle = styled.button.attrs({ type: "button" })`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  cursor: pointer;
  border: 2px solid ${({ $isSelected }) => ($isSelected ? "#333" : "transparent")};
  transform: ${({ $isSelected }) => ($isSelected ? "scale(1.15)" : "none")};
  transition: border 0.3s ease, transform 0.2s ease;

  &:hover {
    border-color: #333;
    transform: scale(1.1);
  }
`;

// With `allowNone`, clicking the selected color clears it (used for filters).
export const CustomColorPicker = ({ selectedColor, onSelectColor, allowNone = false }) => {
  return (
    <ColorGrid>
      {colors.map((color) => (
        <ColorCircle
          key={color}
          $color={color}
          $isSelected={selectedColor === color}
          aria-label={`Color ${color}`}
          aria-pressed={selectedColor === color}
          onClick={() => onSelectColor(allowNone && selectedColor === color ? null : color)}
        />
      ))}
    </ColorGrid>
  );
};
