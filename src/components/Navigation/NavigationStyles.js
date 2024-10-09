import styled from 'styled-components';

export const Nav = styled.nav`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  width: ${({ isExpanded }) => (isExpanded ? '180px' : '70px')};
  padding: 20px 0;
  gap: 10px;
  background-color: #3c096c;
  border-radius: 0 15px 15px 0;
  z-index: 1000;
  transition: width 0.3s ease-in-out;
`;

export const NavItemsContainer = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: flex-start; 
  height: calc(100% - 100px);
  padding-top: 20px;
`;

export const NavItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ isExpanded }) => (isExpanded ? 'flex-start' : 'center')};
  padding: 10px 20px;
  width: 100%;
  box-sizing: border-box;
  transition: justify-content 0.3s, gap 0.3s; 
  cursor: pointer; 

  a {
    display: flex;
    align-items: center;
    text-align: left;
    width: 100%;
    color: #B5C0D0;
    gap: ${({ isExpanded }) => (isExpanded ? '10px' : '0px')};
    justify-content: ${({ isExpanded }) => (isExpanded ? 'flex-start' : 'center')};

    ${({ isActive }) =>
      isActive && `
        background-color: #7b2cbf;
        border-radius: 5px;
    `}

    img {
      object-fit: contain;
      transition: margin 0.3s ease-in-out;
      margin-left: ${({ isExpanded }) => (isExpanded ? '0px' : '0px')};
    }
  }

  span {
    opacity: ${({ isExpanded }) => (isExpanded ? 1 : 0)}; 
    transition: opacity 0.3s ease-in-out;
    white-space: nowrap;
    display: ${({ isExpanded }) => (isExpanded ? 'inline-block' : 'none')};
  }
`;