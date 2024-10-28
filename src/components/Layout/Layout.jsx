import React from 'react';
import styled from 'styled-components';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f4f4f4;
`;

const Main = styled.main`
  flex: 1; 
  margin: 0 auto;
  width: 100%;
`;

const Layout = ({ children }) => {
  return (
    <PageWrapper>
      <Header />
      <Navigation />
      <Main>
        {children}
      </Main>
      <Footer />
    </PageWrapper>
  );
};

export default Layout;
