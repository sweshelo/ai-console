import React from "react";
import { OverlappingLayout } from "../../../unit/package/PrimitiveUix/main";
import { useThread } from "../context/ThreadContext";
import { Color, Sprite } from "../style";
import { StyledButton, StyledText } from "../../../unit/package/StyledUix/main";

const ResetButton = () => {
  const { setThread } = useThread();

  return (
    <OverlappingLayout paddingLeft={10} paddingRight={10}>
      <StyledButton
        styledColor={Color.danger}
        styledSprite={Sprite.kadomaru}
        onClick={() => setThread({ messages: [] })}
      >
        <StyledText
          content="Reset Conversation"
          size={30}
          horizontalAlign="Center"
          verticalAlign="Middle"
        />
      </StyledButton>
    </OverlappingLayout>
  );
};

export default ResetButton;
