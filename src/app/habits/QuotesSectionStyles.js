import styled from 'styled-components';

export const QuotesSection = styled.div`
  font-family: 'Playground', serif;
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background-color: #f9e9e9; 
  border-radius: 12px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative; 

  &:before {
    content: '"'; 
    font-size: 48px; 
    color: #ff6b6b;
    position: absolute;
    top: -20px;
    left: 20px; 
  }

  &:after {
    content: '"';
    font-size: 48px; 
    color: #ff6b6b;
    position: absolute;
    bottom: -20px;
    right: 20px;
  }

  blockquote {
    margin: 0;
    font-size: 1.2rem; 
    font-weight: bold;
    color: #333; 
    line-height: 1.5; 
    text-align: center; 
  }

  footer {
    margin-top: 10px;
    font-style: italic; 
    color: #555; 
  }
`;


// import styled from 'styled-components';

// export const QuotesSection = styled.div`
//   font-family: 'Playground', sans-serif; /* Use Playground font */
//   text-align: center; /* Center the text */
//   padding: 20px;
//   border: 1px solid #B9B8D3; /* Optional: border similar to calendar */
//   background-color: #F5F5F5; /* Light background color */
//   border-radius: 10px;
//   margin-bottom: 20px;

//   blockquote {
//     font-weight: 300; /* Light */
//     font-size: 1.5rem; /* Adjust size as needed */
//     margin: 0;
//     padding: 10px;
//     quotes: "“" "”" "‘" "’"; /* Custom quotes */

//     &::before {
//       content: open-quote;
//       font-size: 2rem; /* Adjust size as needed */
//       color: #FFA500; /* Color for quote marks */
//       margin-right: 5px;
//     }

//     &::after {
//       content: close-quote;
//       font-size: 2rem; /* Adjust size as needed */
//       color: #FFA500; /* Color for quote marks */
//       margin-left: 5px;
//     }
//   }

//   p {
//     font-weight: 500; /* Medium for author */
//     font-size: 1rem;
//     margin-top: 10px;
//   }
// `;