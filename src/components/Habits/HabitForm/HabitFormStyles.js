import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 6px;

  h2 {
    color: var(--primary);
    margin-bottom: 8px;
  }

  label {
    font-weight: 600;
  }
`;

export const Input = styled.input`
  padding: 10px;
  margin-bottom: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

export const Select = styled.select`
  padding: 10px;
  margin-bottom: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

export const DaysContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 8px;
`;

export const DayButton = styled.button.attrs({ type: "button" })`
  padding: 5px 10px;
  background-color: ${({ $selected }) => ($selected ? "#7b2cbf" : "#f0f0f0")};
  color: ${({ $selected }) => ($selected ? "white" : "#000")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 8px;
`;
