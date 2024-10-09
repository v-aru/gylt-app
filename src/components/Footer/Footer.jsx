// src/components/Footer/Footer.jsx
"use client";
import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #f1f1f1;
  padding: 10px;
  position: relative;
  bottom: 0;
  width: 100%;

  p {
    text-align: right;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; {new Date().getFullYear()} GYLT App. All rights reserved.</p>
    </FooterContainer>
  );
};

export default Footer;
