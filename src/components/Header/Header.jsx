import Link from "next/link";
import styled from "styled-components";
import { Logo } from "@/components/Icons";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  padding-top: 10px;

  svg {
    max-width: 160px;
    height: auto;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Link href="/" aria-label="GYLT home">
        <Logo />
      </Link>
    </HeaderContainer>
  );
};

export default Header;
