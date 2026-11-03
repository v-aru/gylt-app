import styled from "styled-components";

const FooterContainer = styled.footer`
  padding: 10px 20px;
  color: var(--muted);
  font-size: 0.85rem;
  text-align: right;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; {new Date().getFullYear()} GYLT App</p>
    </FooterContainer>
  );
};

export default Footer;
