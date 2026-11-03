import { createGlobalStyle } from "styled-components";

const GlobalFontStyle = createGlobalStyle`
  @font-face {
    font-family: 'Playground';
    src: url('/assets/fonts/PlaygroundOTF/PPPlayground-Thin.otf') format('opentype');
    font-weight: 100;
    font-display: swap;
  }

  @font-face {
    font-family: 'Playground';
    src: url('/assets/fonts/PlaygroundOTF/PPPlayground-Light.otf') format('opentype');
    font-weight: 300;
    font-display: swap;
  }

  @font-face {
    font-family: 'Playground';
    src: url('/assets/fonts/PlaygroundOTF/PPPlayground-Medium.otf') format('opentype');
    font-weight: 500;
    font-display: swap;
  }
`;

export default GlobalFontStyle;
