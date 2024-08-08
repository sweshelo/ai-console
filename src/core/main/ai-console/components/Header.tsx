import React from "react";
import { StyledText } from "../../../unit/package/StyledUix/main";
import { Color } from "../style";
import { VerticalLayout } from "../../../unit/package/PrimitiveUix/main";

const Header = () => (
  <VerticalLayout>
    <StyledText
      content="AI Console"
      size={60}
      styledColor={Color.text}
      verticalAlign="Middle"
      horizontalAlign="Center"
    />
    <StyledText
      content="by sweshelo"
      size={30}
      styledColor={Color.text}
      verticalAlign="Middle"
      horizontalAlign="Center"
    />
  </VerticalLayout>
);

export default Header;
