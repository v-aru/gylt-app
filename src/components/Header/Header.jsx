// src/components/Header/Header.jsx
"use client";
import React from 'react';
import Navigation from '../Navigation/Navigation'; 
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #1d267d;
  color: white;
  padding: 20px;
  text-align: center;

  h1 {
    margin: 0;
    font-size: 2rem;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <h1>GYLT App</h1>
      <Navigation />
    </HeaderContainer>
  );
};

export default Header;