// src/components/Footer/Footer.jsx
"use client";
import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #f1f1f1;
  text-align: center;
  padding: 10px;
  position: relative;
  bottom: 0;
  width: 100%;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; {new Date().getFullYear()} GYLT App. All rights reserved.</p>
    </FooterContainer>
  );
};

export default Footer;
