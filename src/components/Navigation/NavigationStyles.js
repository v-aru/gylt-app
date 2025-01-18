import styled from 'styled-components';

export const Nav = styled.nav`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
  flex-direction: column;
  justify-content: flex-start;
  height: 100vh;
  z-index: 1000;
  width: ${({ isExpanded }) => (isExpanded ? '180px' : '70px')};
  padding: 20px 0;
  gap: 10px;
  background-color: #3e274f;
  transition: width 0.5s ease-in-out;
`;

export const NavItemsContainer = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: flex-start; 
  width: 100%;
  height: calc(100% - 100px);
  padding-top: 10px;
  gap: 10px;
  box-sizing: border-box;

  // Targeting each NavItem by its nth-child for staggered transitions
  & > :nth-child(1) {
    transition-delay: 0s;
  }
  & > :nth-child(2) {
    transition-delay: 0.1s;
  }
  & > :nth-child(3) {
    transition-delay: 0.2s;
  }
  & > :nth-child(4) {
    transition-delay: 0.3s;
  }
`;

export const NavItem = styled.div`
  display: flex;
  // justify-content: ${({ isExpanded }) => (isExpanded ? 'flex-start' : 'center')};
  justify-content: center;
  padding: 10px 20px;
  width: 100%;
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  opacity: 1;
  transform: ${({ isExpanded }) => (isExpanded ? 'translateX(0)' : 'translateX(-10px)')};
  cursor: pointer; 
  background-color: ${({ isActive }) => (isActive ? '#7b2cbf' : 'transparent')};
  border-radius: ${({ isActive }) => (isActive ? '5px' : '0')};

  a {
    display: flex;
    align-items: center;
    text-align: left;
    width: 100%;
    color: #B5C0D0;
    gap: ${({ isExpanded }) => (isExpanded ? '10px' : '0px')};

    &:hover {
      background-color: #5D536B;
      border-radius: 5px;
    }
  }

  svg {
    position: static;
    background-color: #645272; // Dark circular background for icon only , alternatively use #513c60
    border-radius: 50%;
    padding: 4px; 
    width: 36px; 
    height: 36px;
    transition: background-color 0.3s ease;
  }

  span {
    opacity: ${({ isExpanded }) => (isExpanded ? 1 : 0)}; 
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
    transform: ${({ isExpanded }) => (isExpanded ? 'translateY(0)' : 'translateY(-10px)')};
    white-space: nowrap;
    display: ${({ isExpanded }) => (isExpanded ? 'inline-block' : 'none')};
    width: ${({ isExpanded }) => (isExpanded ? 'auto' : '0')};
    overflow: hidden;
  }
`;