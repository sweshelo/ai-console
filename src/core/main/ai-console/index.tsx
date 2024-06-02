import { useCallback, useEffect, useState } from "react";
import {
  Canvas,
  HorizontalLayout,
  LayoutElement,
  OverlappingLayout,
  VerticalLayout,
} from "../../../unit/package/PrimitiveUix/main";
import {
  StyledButton,
  StyledImage,
  StyledMask,
  StyledRawImage,
  StyledScrollArea,
  StyledText,
  StyledTextField,
} from "../../../unit/package/StyledUix/main";
import { Color, Material, Sprite, StyledSpace } from "./style";
import { callGenerativeAIAPI, getColorFromRole } from "./api";
import { Thread, Model, Message } from "./types";
import { Stream } from "openai/streaming";
import { ChatCompletionChunk } from "openai/resources";
import { ImagesResponse } from "openai/resources";
import { createSprite } from "../../../lib/styledUnit";

function isImagesResponse(value: any): value is ImagesResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    "data" in value &&
    Array.isArray(value.data) &&
    value.data.every(
      (item: any) =>
        typeof item === "object" &&
        "url" in item &&
        typeof item.url === "string"
    )
  );
}

export const Main = () => {
  const [prompt, setPrompt] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [thread, setThread] = useState<Thread>({ messages: [] });
  const [modelIndex, setModelIndex] = useState(0);

  const llmModel: Model[] = [
    { vendor: "OpenAI", name: "gpt-3.5-turbo", type: "chat" },
    { vendor: "OpenAI", name: "gpt-4", type: "chat" },
    { vendor: "OpenAI", name: "gpt-4o", type: "chat" },
    { vendor: "OpenAI", name: "dall-e-3", type: "image" },
    // { vendor: 'Anthropic', name: 'claude opus' },
  ];

  const handleSubmitClick = async () => {
    if (prompt.trim().length == 0) return;
    setThread((prevThread) => {
      const updatedThread = {
        messages: [
          ...prevThread.messages,
          {
            role: "user",
            content: prompt.trim(),
            type: "chat",
          },
        ],
      } as Thread;

      callGenerativeAI(updatedThread);
      return updatedThread;
    });
  };

  const callGenerativeAI = async (_thread: Thread) => {
    const result = await callGenerativeAIAPI({
      model: llmModel[modelIndex] as Model,
      thread: _thread,
    });

    if (result instanceof Stream) {
      if (result) {
        setThread((prevThread) => {
          return {
            messages: [
              ...prevThread.messages,
              {
                role: "assistant",
                content: "",
                type: "chat",
              },
            ],
          } as Thread;
        });
        for await (const chunk of result) {
          console.log(chunk);
          updateLastMessageInThread(chunk.choices[0]?.delta?.content ?? "");
        }
      }
    }

    if (isImagesResponse(result)) {
      if (result) {
        setThread((prevThread) => {
          return {
            messages: [
              ...prevThread.messages,
              {
                role: "assistant",
                content: result.data[0].revised_prompt,
                type: "chat",
              },
              {
                role: "system",
                content: result.data[0].url,
                type: "image",
              },
            ] as Message[],
          };
        });
      }
    }
  };

  const updateLastMessageInThread = (content: string) => {
    setThread((prevThread) => {
      const updatedMessages = [...prevThread.messages];
      if (updatedMessages.length > 0) {
        const lastMessage = updatedMessages[updatedMessages.length - 1];
        if (lastMessage.role === "assistant") {
          lastMessage.content += content;
        }
      }
      return {
        messages: updatedMessages,
      };
    });
  };

  return (
    <StyledSpace>
      <Canvas size={[1000, 1200]}>
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
            <StyledText
              content="AI Console"
              size={60}
              styledColor={Color.text}
              verticalAlign="Middle"
              horizontalAlign="Center"
            />
          </LayoutElement>
          <LayoutElement preferredHeight={80}>
            <HorizontalLayout
              paddingBottom={0}
              paddingTop={20}
              paddingLeft={10}
              paddingRight={10}
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
                <StyledText
                  content={`${llmModel[modelIndex].vendor} / ${llmModel[modelIndex].name}`}
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
          </LayoutElement>
          <LayoutElement minHeight={50}>
            <OverlappingLayout paddingLeft={10} paddingRight={10}>
              <StyledButton
                styledColor={Color.danger}
                styledSprite={Sprite.kadomaru}
                onClick={() => {
                  setThread({ messages: [] });
                }}
              >
                <StyledText
                  content="Reset Conversation"
                  size={30}
                  horizontalAlign="Center"
                  verticalAlign="Middle"
                />
              </StyledButton>
            </OverlappingLayout>
          </LayoutElement>
          <LayoutElement preferredHeight={100}>
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
                  onClick={handleSubmitClick}
                  defaultColor={[0.4, 0.4, 0.8, 1.0]}
                  styledSprite={Sprite.kadomaru}
                >
                  <StyledText />
                </StyledButton>
              </LayoutElement>
            </HorizontalLayout>
          </LayoutElement>
          <LayoutElement flexibleHeight={1}>
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
                  {thread.messages.map((m, index) => {
                    if (m.type === "chat") {
                      return (
                        <OverlappingLayout
                          paddingBottom={5}
                          paddingLeft={5}
                          paddingRight={5}
                          paddingTop={5}
                          key={`chat-messages-${index}`}
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
                            <StyledText
                              content={m.content}
                              styledColor={Color.text}
                              horizontalAlign="Left"
                              verticalAlign="Middle"
                              size={25}
                            />
                          </OverlappingLayout>
                        </OverlappingLayout>
                      );
                    }
                    if (m.type === "image") {
                      const image = createSprite({
                        url: m.content,
                        rect: [1, 1, 1, 1],
                        borders: [0.33333, 0.33333, 0.33333, 0.33333],
                        scale: 0.1,
                      });
                      return (
                        <OverlappingLayout
                          paddingBottom={5}
                          paddingLeft={5}
                          paddingRight={5}
                          paddingTop={5}
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
                              <StyledRawImage
                                url={m.content}
                                preserveAspect={true}
                              />
                            </LayoutElement>
                          </OverlappingLayout>
                        </OverlappingLayout>
                      );
                    }
                  })}
                </VerticalLayout>
              </StyledScrollArea>
            </StyledMask>
          </LayoutElement>
        </VerticalLayout>
      </Canvas>
    </StyledSpace>
  );
};
