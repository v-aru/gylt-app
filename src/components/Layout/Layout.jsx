import { useRouter } from "next/router";
import styled from "styled-components";
import { fadeIn } from "../../../styles/animations";
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

// Re-keyed on every route change so each page eases in. Opacity only: a
// transform here would break the position: fixed buttons and modals inside.
const PageTransition = styled.div`
  animation: ${fadeIn} 0.3s ease;
`;

const Layout = ({ children }) => {
  const { pathname } = useRouter();

  return (
    <PageWrapper>
      <Navigation />
      <Header />
      <Main>
        <PageTransition key={pathname}>{children}</PageTransition>
      </Main>
      <Footer />
    </PageWrapper>
  );
};

export default Layout;
