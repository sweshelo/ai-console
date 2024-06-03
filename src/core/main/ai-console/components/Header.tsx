import React from "react";
import { StyledText } from "../../../unit/package/StyledUix/main";
import { Color } from "../style";

const Header = () => (
  <StyledText
    content="AI Console"
    size={60}
    styledColor={Color.text}
    verticalAlign="Middle"
    horizontalAlign="Center"
  />
);

export default Header;
