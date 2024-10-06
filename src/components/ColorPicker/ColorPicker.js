import styled from "styled-components";

export const colors = ['#DF2E38', '#FFAD60', '#F6E96B', '#88D66C', '#03AED2', '#CAEDFF', '#ADA2FF','#4F1787'];

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr); /* 8 columns */
  gap: 5px; /* Spacing between colors */
  margin: 10px 0;
`;

const ColorCircle = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  cursor: pointer;
  border: 2px solid transparent;
  transition: border 0.3s;

  &:hover {
    border: 2px solid #000; /* Highlight on hover */
  }
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