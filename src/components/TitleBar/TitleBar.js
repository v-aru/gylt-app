"use client";
import styled from "styled-components";
import Image from "next/image";

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  font-size: 2rem;
  justify-content: center;
  padding: 20px;
  background-color: #757bc8;
  z-index: 1;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
`;

const Title = styled.h1`
  margin: 0 10px;
  font-size: 36px;
  color: white;
`;


export default function TitleBar() {
  return (
    <HeaderContainer>
        <Title>
            <Image src="/images/Logo.png" alt="GYLT" width={150} height={50}/>
        </Title>
      </HeaderContainer>
  );
}