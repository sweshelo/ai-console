import React from "react";
import {
  HorizontalLayout,
  LayoutElement,
  OverlappingLayout,
  VerticalLayout,
} from "../../../unit/package/PrimitiveUix/main";
import {
  StyledButton,
  StyledImage,
  StyledText,
} from "../../../unit/package/StyledUix/main";
import { Color, Material, Sprite } from "../style";
import { useThread } from "../context/ThreadContext";
import { createColor } from "../../../lib/styledUnit";
import {
  ButtonClipboardCopyText,
  ContactLink,
} from "../../../unit/package/Primitive/main";

export const ErrorDialog = () => {
  const { error, setError } = useThread();

  return error ? (
    <OverlappingLayout
      paddingBottom={300}
      paddingLeft={30}
      paddingRight={30}
      paddingTop={300}
    >
      <StyledImage
        defaultColor={[0, 0, 0, 0.99]}
        styledSprite={Sprite.kadomaru}
      />
      <VerticalLayout
        paddingLeft={40}
        paddingBottom={40}
        paddingRight={40}
        paddingTop={40}
        spacing={40}
      >
        <LayoutElement minHeight={60}>
          <StyledText
            content="Error"
            size={40}
            styledColor={Color.text}
            horizontalAlign="Center"
            verticalAlign="Middle"
          />
        </LayoutElement>
        <LayoutElement flexibleHeight={1}>
          <StyledText
            content={error}
            size={30}
            styledColor={Color.text}
            horizontalAlign="Center"
            verticalAlign="Middle"
          />
        </LayoutElement>
        <LayoutElement minHeight={60}>
          <HorizontalLayout spacing={10}>
            <ContactLink userId={process.env.CV_OWNER_ID} />
            {/* <ButtonClipboardCopyText value={error}/> */}
          </HorizontalLayout>
        </LayoutElement>
        <LayoutElement minHeight={80}>
          <StyledButton
            styledSprite={Sprite.kadomaru}
            styledColor={Color.blue}
            onClick={() => setError("")}
          >
            <StyledText
              content="Close"
              size={30}
              styledColor={Color.text}
              horizontalAlign="Center"
              verticalAlign="Middle"
            />
          </StyledButton>
        </LayoutElement>
      </VerticalLayout>
    </OverlappingLayout>
  ) : null;
};
