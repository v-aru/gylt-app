import styled from "styled-components";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* Leave room for the fixed side navigation. */
  padding-left: 70px;
  background-color: var(--background);
`;

const Main = styled.main`
  flex: 1;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;

  @media (max-width: 600px) {
    padding: 12px;
  }
`;

const Layout = ({ children }) => {
  return (
    <PageWrapper>
      <Navigation />
      <Header />
      <Main>{children}</Main>
      <Footer />
    </PageWrapper>
  );
};

export default Layout;
