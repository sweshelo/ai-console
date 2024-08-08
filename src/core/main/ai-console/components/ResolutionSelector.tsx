import React from "react";

import {
  HorizontalLayout,
  LayoutElement,
  VerticalLayout,
} from "../../../unit/package/PrimitiveUix/main";
import { useThread } from "../context/ThreadContext";
import { Color, Sprite } from "../style";
import { StyledButton, StyledText } from "../../../unit/package/StyledUix/main";
import { AvailResolutions } from "../api/const";

const ResolutionSelector = () => {
  const { resolutionIndex, setResolutionIndex } = useThread();

  return (
    <HorizontalLayout
      paddingBottom={0}
      paddingTop={20}
      paddingLeft={10}
      paddingRight={10}
    >
      <LayoutElement minHeight={40}>
        <StyledButton
          styledSprite={Sprite.kadomaru}
          styledColor={resolutionIndex <= 0 ? Color.gray : Color.blue}
          onClick={() => {
            if (resolutionIndex > 0) setResolutionIndex(resolutionIndex - 1);
          }}
        >
          <StyledText
            content="<"
            size={30}
            horizontalAlign="Center"
            verticalAlign="Middle"
          />
        </StyledButton>
      </LayoutElement>
      <LayoutElement preferredWidth={300}>
        <StyledText
          content={`${AvailResolutions[resolutionIndex].value}`}
          size={30}
          horizontalAlign="Center"
          verticalAlign="Middle"
          styledColor={Color.text}
        />
      </LayoutElement>
      <LayoutElement minHeight={40}>
        <StyledButton
          styledSprite={Sprite.kadomaru}
          styledColor={
            resolutionIndex >= AvailResolutions.length - 1
              ? Color.gray
              : Color.blue
          }
          onClick={() => {
            if (resolutionIndex < AvailResolutions.length - 1)
              setResolutionIndex(resolutionIndex + 1);
          }}
        >
          <StyledText
            content=">"
            size={30}
            horizontalAlign="Center"
            verticalAlign="Middle"
          />
        </StyledButton>
      </LayoutElement>
    </HorizontalLayout>
  );
};

export default ResolutionSelector;
