import styled from "styled-components";

export const colors = ['#DF2E38', '#FFAD60', '#F6E96B', '#88D66C', '#03AED2', '#CAEDFF', '#ADA2FF','#4F1787'];

const ColorGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px; 
  justify-content: center; 
  align-items: center;
  margin: 15px 0;
  padding: 5px;
`;

const ColorCircle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  cursor: pointer;
  border: 2px solid transparent;
  transition: border 0.3s ease, transform 0.2s ease;

  &:hover {
    border: 2px solid #333; /* Highlight on hover */
    transform: scale(1.1);
  }

  ${({ isSelected }) =>
    isSelected &&
    `
    border: 2px solid #333;
  `}
`;

export const CustomColorPicker = ({ selectedColor, onSelectColor }) => {
  return (
    <ColorGrid>
      {colors.map((color) => (
        <ColorCircle
          key={color}
          color={color}
          onClick={() => {
            onSelectColor(selectedColor === color ? null : color);
          }}
          style={{
            border: selectedColor === color ? '2px solid #000' : '2px solid transparent'
          }}
        />
      ))}
    </ColorGrid>
  );
};