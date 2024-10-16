"use client";
import React from 'react';
import styled from 'styled-components';

const SubscriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
`;

const Message = styled.p`
  font-size: 1.5rem;
  color: #555;
  margin: 20px 0;
`;

const ComingSoonTag = styled.span`
  font-size: 1.2rem;
  color: #ff6347;
  margin-top: 10px;
`;

export default function SubscriptionPage() {
  return (
    <SubscriptionContainer>
      <Title>Subscription Feature</Title>
      <Message>We&apos;re working hard to bring you exciting new features!</Message>
      <ComingSoonTag>Coming Soon in 2025 🚀</ComingSoonTag>
    </SubscriptionContainer>
  );
}
