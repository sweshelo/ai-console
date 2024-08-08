import React from "react";
import {
  HorizontalLayout,
  LayoutElement,
  OverlappingLayout,
  VerticalLayout,
} from "../../../unit/package/PrimitiveUix/main";
import { useThread } from "../context/ThreadContext";
import { Color, Sprite } from "../style";
import {
  StyledButton,
  StyledImage,
  StyledText,
} from "../../../unit/package/StyledUix/main";
import { llmModel } from "../api/const";

const ModelSelector = () => {
  const { modelIndex, setModelIndex } = useThread();

  return (
    <OverlappingLayout
      paddingBottom={0}
      paddingTop={20}
      paddingLeft={10}
      paddingRight={10}
    >
      <StyledImage
        styledSprite={Sprite.kadomaru}
        defaultColor={[0.2, 0.2, 0.2, 1.0]}
      />
      <HorizontalLayout
        paddingBottom={10}
        paddingLeft={10}
        paddingRight={10}
        paddingTop={10}
      >
        <LayoutElement minHeight={40}>
          <StyledButton
            styledSprite={Sprite.kadomaru}
            styledColor={modelIndex <= 0 ? Color.gray : Color.blue}
            onClick={() => {
              if (modelIndex > 0) setModelIndex(modelIndex - 1);
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
          <VerticalLayout>
            <StyledText
              content={`${llmModel[modelIndex].vendor} ${llmModel[modelIndex].shortName}`}
              size={30}
              horizontalAlign="Center"
              verticalAlign="Middle"
              styledColor={Color.text}
            />
            <StyledText
              content={`${llmModel[modelIndex].description}`}
              size={20}
              horizontalAlign="Center"
              verticalAlign="Middle"
              styledColor={Color.text}
            />
          </VerticalLayout>
        </LayoutElement>
        <LayoutElement minHeight={40}>
          <StyledButton
            styledSprite={Sprite.kadomaru}
            styledColor={
              modelIndex >= llmModel.length - 1 ? Color.gray : Color.blue
            }
            onClick={() => {
              if (modelIndex < llmModel.length - 1)
                setModelIndex(modelIndex + 1);
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
    </OverlappingLayout>
  );
};

export default ModelSelector;
