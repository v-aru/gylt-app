import React from 'react';
import styled from 'styled-components';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';


const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Navigation/>
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
