import React from "react";
import { ThreadProvider, useThread } from "./context/ThreadContext";
import { Color, Material, Sprite, StyledSpace } from "./style";
import {
  Canvas,
  LayoutElement,
  VerticalLayout,
} from "../../unit/package/PrimitiveUix/main";
import Header from "./components/Header";
import ModelSelector from "./components/ModelSelector";
import ResetButton from "./components/ResetButton";
import InputArea from "./components/InputArea";
import MessageList from "./components/MessageList";
import { StyledImage } from "../../unit/package/StyledUix/main";
import { MessageBody } from "../../unit/package/AiConsole/main";

export const Main = () => {
  const { thread } = useThread();
  return (
    <StyledSpace>
      <Canvas size={[1000, 1500]}>
        <StyledImage
          styledColor={Color.background}
          styledMaterial={Material.base}
          styledSprite={Sprite.kadomaru}
        />
        <VerticalLayout
          paddingBottom={30}
          paddingLeft={30}
          paddingRight={30}
          paddingTop={50}
          spacing={20}
        >
          <LayoutElement preferredHeight={40}>
            <Header />
          </LayoutElement>
          <LayoutElement preferredHeight={80}>
            <ModelSelector />
          </LayoutElement>
          <LayoutElement minHeight={50}>
            <ResetButton />
          </LayoutElement>
          <LayoutElement preferredHeight={100}>
            <InputArea />
          </LayoutElement>
          <LayoutElement flexibleHeight={1}>
            <MessageList messages={thread.messages} />
          </LayoutElement>
        </VerticalLayout>
        <MessageBody />
      </Canvas>
    </StyledSpace>
  );
};
