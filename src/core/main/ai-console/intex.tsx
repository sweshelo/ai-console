import React from "react";
import { ThreadProvider, useThread } from "./context/ThreadContext";
import { StyledSpace } from "./style";
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

export const Main = () => {
  const { thread } = useThread();
  return (
    <ThreadProvider>
      <StyledSpace>
        <Canvas size={[1000, 1200]}>
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
        </Canvas>
      </StyledSpace>
    </ThreadProvider>
  );
};
