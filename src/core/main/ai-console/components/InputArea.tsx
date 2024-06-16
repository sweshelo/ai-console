import React from "react";
import {
  HorizontalLayout,
  LayoutElement,
} from "../../../unit/package/PrimitiveUix/main";
import { useThread } from "../context/ThreadContext";
import { Color, Sprite } from "../style";
import {
  StyledButton,
  StyledText,
  StyledTextField,
} from "../../../unit/package/StyledUix/main";

const InputArea = () => {
  const { prompt, setPrompt, callAiAPI, isGenerating } = useThread();

  return (
    <HorizontalLayout
      paddingBottom={10}
      paddingLeft={10}
      paddingRight={10}
      paddingTop={10}
      spacing={10}
    >
      <LayoutElement flexibleWidth={1}>
        <StyledTextField
          onChange={(env, _text) => setPrompt(_text)}
          styledBackgroundSprite={Sprite.kadomaru}
        />
      </LayoutElement>
      <LayoutElement preferredWidth={100}>
        <StyledButton
          onClick={callAiAPI}
          enabled={!isGenerating}
          defaultColor={[0.4, 0.4, 0.8, 1.0]}
          styledSprite={Sprite.kadomaru}
        >
          <StyledText
            content="Submit"
            size={25}
            styledColor={Color.text}
            horizontalAlign="Center"
            verticalAlign="Middle"
          />
        </StyledButton>
      </LayoutElement>
    </HorizontalLayout>
  );
};

export default InputArea;
