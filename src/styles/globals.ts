import { css } from "@emotion/react";

export const globalStyles = css`
  * {
    margin: 0;
    box-sizing: border-box;
    font-family: "notoSansEN", "notoSansKR", sans-serif;
  }

  @font-face {
    font-family: "notoSansKR";
    src: url("/fonts/NotoSansKR.ttf");
    unicode-range: U+AC00-D7A3;
  }

  @font-face {
    font-family: "notoSansEN";
    src: url("/fonts/NotoSansEN.ttf");
    unicode-range: U+0041-005A, U+0061-007A, U+0030-0039, U+0020-002F,
      U+003A-0040, U+005B-0060, U+007B-007E;
  }
`;
