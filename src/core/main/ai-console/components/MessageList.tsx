import React from "react";
import {
  VerticalLayout,
  OverlappingLayout,
  LayoutElement,
} from "../../../unit/package/PrimitiveUix/main";
import { getColorFromRole } from "../api";
import { Thread, Message } from "../types";
import { Color, Sprite } from "../style";
import {
  StyledImage,
  StyledMask,
  StyledRawImage,
  StyledScrollArea,
  StyledText,
} from "../../../unit/package/StyledUix/main";
import { MessageComponent, Image } from "../../../unit/package/AiConsole/main";

const MessageList = ({ messages }: { messages: Message[] }) => (
  <StyledMask>
    <StyledScrollArea verticalFit="PreferredSize">
      <VerticalLayout
        forceExpandChildHeight={false}
        paddingBottom={10}
        paddingLeft={15}
        paddingRight={15}
        paddingTop={10}
        spacing={10}
      >
        {messages.map((m, index) => {
          if (m.type === "chat") {
            return (
              <MessageComponent
                key={index}
                content={m.content}
                backgroundColor={getColorFromRole(m.role)}
              />
            );
          }
          if (m.type === "image") {
            return (
              <OverlappingLayout
                paddingBottom={5}
                paddingLeft={5}
                paddingRight={5}
                paddingTop={5}
                key={`image-messages-${index}`}
              >
                <StyledImage
                  styledSprite={Sprite.kadomaru}
                  defaultColor={getColorFromRole(m.role)}
                />
                <OverlappingLayout
                  paddingBottom={10}
                  paddingLeft={10}
                  paddingRight={10}
                  paddingTop={10}
                >
                  <LayoutElement minHeight={500}>
                    <Image uri={m.content} />
                  </LayoutElement>
                </OverlappingLayout>
              </OverlappingLayout>
            );
          }
        })}
      </VerticalLayout>
    </StyledScrollArea>
  </StyledMask>
);

export default MessageList;
