"use client";
import styled from "styled-components";

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;

  h1 {
    
  }
`;

export default function Home() {
  return (
    <>
    <Main>
      <h1>Welcome to GYLT</h1>
      <p>Manage your life with habits, health tracking, to-dos, and more.</p>
    </Main>
    </>
  );
}
