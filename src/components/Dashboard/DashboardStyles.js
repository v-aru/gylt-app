import styled from "styled-components";

export const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
  gap: 20px;
  margin-top: 30px;
  text-align: left;
`;

export const SectionCard = styled.section`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

export const SectionTitle = styled.h2`
  font-size: 1.3rem;
  color: var(--primary);
  margin-bottom: 15px;
`;

export const CardFooter = styled.div`
  margin-top: auto;
  padding-top: 15px;
  text-align: right;

  a {
    color: var(--accent);
    font-weight: 600;
    text-decoration: none;
  }
`;

export const Progress = styled.div`
  margin-bottom: 12px;
  font-weight: bold;
  color: var(--success);
`;
