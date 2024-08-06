import React, { useState } from "react";
import { ThreadProvider, useThread } from "./context/ThreadContext";
import { Color, Material, Sprite, StyledSpace } from "./style";
import {
  Canvas,
  HorizontalLayout,
  LayoutElement,
  OverlappingLayout,
  VerticalLayout,
} from "../../unit/package/PrimitiveUix/main";
import Header from "./components/Header";
import ModelSelector from "./components/ModelSelector";
import ResetButton from "./components/ResetButton";
import InputArea from "./components/InputArea";
import MessageList from "./components/MessageList";
import {
  StyledButton,
  StyledImage,
  StyledText,
} from "../../unit/package/StyledUix/main";
import ResolutionSelector from "./components/ResolutionSelector";
import { ErrorDialog } from "./components/ErrorDialog";

export const Main = () => {
  const { thread } = useThread();
  const [isOpenConfig, setOpenConfig] = useState(false);

  const ToggleConfigurationButton = React.memo(() => (
    <OverlappingLayout paddingLeft={10} paddingRight={10}>
      <StyledButton
        styledColor={Color.blue}
        styledSprite={Sprite.kadomaru}
        onClick={() => setOpenConfig(!isOpenConfig)}
      >
        <StyledText
          content={isOpenConfig ? "Close Configuration" : "Open Configuration"}
          size={30}
          horizontalAlign="Center"
          verticalAlign="Middle"
        />
      </StyledButton>
    </OverlappingLayout>
  ));

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
          <LayoutElement preferredHeight={40} minHeight={40}>
            <Header />
          </LayoutElement>
          <OverlappingLayout>
            <VerticalLayout spacing={20}>
              {!isOpenConfig ? (
                <>
                  <LayoutElement preferredHeight={80}>
                    <ModelSelector />
                  </LayoutElement>
                  <LayoutElement minHeight={50}>
                    <HorizontalLayout>
                      <ResetButton />
                      <ToggleConfigurationButton />
                    </HorizontalLayout>
                  </LayoutElement>
                  <LayoutElement flexibleHeight={1}>
                    <MessageList messages={thread.messages} />
                  </LayoutElement>
                  <LayoutElement preferredHeight={100}>
                    <InputArea />
                  </LayoutElement>
                </>
              ) : (
                <>
                  <LayoutElement flexibleHeight={1}>
                    <StyledImage
                      styledSprite={Sprite.kadomaru}
                      defaultColor={[0.2, 0.2, 0.2, 1.0]}
                    />
                    <VerticalLayout>
                      <LayoutElement>
                        <VerticalLayout>
                          <StyledText
                            content="Image resolution"
                            size={25}
                            styledColor={Color.text}
                            horizontalAlign="Center"
                            verticalAlign="Middle"
                          />
                          <ResolutionSelector />
                        </VerticalLayout>
                      </LayoutElement>
                      <LayoutElement />
                      <LayoutElement />
                      <LayoutElement />
                      <LayoutElement />
                    </VerticalLayout>
                  </LayoutElement>
                  <LayoutElement preferredHeight={80}>
                    <ToggleConfigurationButton />
                  </LayoutElement>
                </>
              )}
            </VerticalLayout>
            <ErrorDialog />
          </OverlappingLayout>
        </VerticalLayout>
      </Canvas>
    </StyledSpace>
  );
};
