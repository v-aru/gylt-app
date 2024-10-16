"use client";
import React from 'react';
import Navigation from '../Navigation/Navigation'; 
import styled from 'styled-components';
import Logo from '../../../public/assets/Logo';


const HeaderContainer = styled.header`
  background-color: #1d267d;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2rem;
`;

const Header = () => {
  return (
    <>
    <Navigation />
    <HeaderContainer>
      <Logo alt="GYLT Logo"/>
      {/* <Title>GYLT App</Title> */}
    </HeaderContainer>
    </>
  );
};

export default Header;