"use client";
import React from 'react';
import styled from 'styled-components';
import Navigation from '@/components/Navigation/Navigation'; 
import Footer from '@/components/Footer/Footer';

const SubscriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 80px); /* Adjusting for the height of the navigation */
  // background-color: #f5f5f5;
  background-color: #323052;
  text-align: center;
  color: white;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  // color: #333;
`;

const Message = styled.p`
  font-size: 1.5rem;
  // color: #555;
  margin: 20px 0;
`;

const ComingSoonTag = styled.span`
  font-size: 1.2rem;
  color: #ff6347;
  margin-top: 10px;
`;

export default function SubscriptionPage() {
  return (
    <>
      <Navigation /> {/* Include the navigation component */}
      <SubscriptionContainer>
        <Title>Subscription Feature</Title>
        <Message>We&apos;re working hard to bring you exciting new features!</Message>
        <ComingSoonTag>Coming Soon in 2025 🚀</ComingSoonTag>
      </SubscriptionContainer>
      <Footer/>
    </>
  );
}
