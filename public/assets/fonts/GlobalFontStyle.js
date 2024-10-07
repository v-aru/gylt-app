import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Playground';
    src: url('./PlaygroundOTF/Playground-Light.otf') format('opentype');
    font-weight: 300; /* Light */
    font-style: normal;
  }

  @font-face {
    font-family: 'Playground';
    src: url('./PlaygroundOTF/Playground-Medium.otf') format('opentype');
    font-weight: 500; /* Medium */
    font-style: normal;
  }

  @font-face {
    font-family: 'Playground';
    src: url('./PlaygroundOTF/Playground-Thin.otf') format('opentype');
    font-weight: 100; /* Thin */
    font-style: normal;
  }

  /* Apply the global font */
  body {
    font-family: 'Playground', sans-serif;
  }
`;

export default GlobalStyle;
