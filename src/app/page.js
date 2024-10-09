"use client";
import styled from "styled-components";
import Layout from "@/components/Layout/Layout";

const MainContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  background-color: #E5D9F2;
  height: 100vh; 
  text-align: center; 
  padding: 20px; 

  h1 {
    font-size: 2.5rem; 
    color: #1d267d; 
    margin-bottom: 20px;
  }

  p {
    font-size: 1.2rem; 
    color: #333; 
    margin-bottom: 30px; 
  }

  button {
    background-color: #1d267d; 
    color: white; 
    border: none; 
    border-radius: 5px;
    padding: 10px 20px; 
    font-size: 1rem; 
    cursor: pointer; 
    transition: background-color 0.3s; 

    &:hover {
      background-color: #1a1e54;
    }
  }
`;

export default function Home() {
  return (
    <MainContent>
      <h1>Welcome to GYLT</h1>
      <p>Manage your life with habits, health tracking, to-dos, and more.</p>
      <button onClick={() => alert("Sign Up or Log In!")}>Get Started</button>
    </MainContent>
  );
}
