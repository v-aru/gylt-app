import styled from 'styled-components';

export const Nav = styled.nav`
  display: flex;
  position: fixed;
  left: 0;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  width: ${({ isExpanded }) => (isExpanded ? '200px' : '90px')};
  padding: 20px 0;
  gap: 10px;
  background-color: #99c1de;
  border-radius: 0 15px 15px 0;
  z-index: 1000;
  transition: width 0.3s; 

//   .nav-items {
//     display: flex;
//     flex-direction: column;
//     gap: 50px;
//   }

//   a {
//     margin-bottom: 20px; 
//     text-align: center;
//     display: flex;
//     justify-content: center; 
//   }
`;

export const NavItemsContainer = styled.div`
  display: flex;
  flex-direction: column; // Change to column to stack items vertically
  justify-content: space-evenly; // Distribute space evenly
  height: calc(100% - 80px); // Adjust height to avoid overflow
  padding-top: 20px; // Add padding on top to space out from logo
`;

export const NavItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: opacity 0.3s; 
  text-align: justify;
  cursor: pointer; 
  
  span {
    opacity: ${({ isExpanded }) => (isExpanded ? 1 : 0)}; 
    margin-left: 10px; 
  }
`;