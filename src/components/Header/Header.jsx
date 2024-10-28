"use client";
import React from 'react';
import styled from 'styled-components';
import Logo from '../../../public/assets/Logo';


const HeaderContainer = styled.header`
  // background-color: #323052;
  background-color: #f4f4f4;
  color: white;
  text-align: center;
  display: flex;
  // border-radius: 20px;
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
    <HeaderContainer>
      <Logo alt="GYLT Logo"/>
      {/* <Title>GYLT App</Title> */}
    </HeaderContainer>
    </>
  );
};

export default Header;