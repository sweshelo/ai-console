import React, { createContext, useContext, useState, ReactNode } from "react";
import { Message, Model, Thread } from "../types";
import { callGenerativeAIAPI } from "../api";
import { AvailResolutions, llmModel } from "../api/const";
import { MessageStream } from "@anthropic-ai/sdk/lib/MessageStream";
import { ChatCompletionChunk, ImagesResponse } from "openai/resources";
import { Stream as OpenAIStream } from "openai/streaming";
import { FunctionEnv } from "../../../../lib/mirage-x/common/interactionEvent";
import { getContacts } from "../resonite-api/client";

interface ThreadContextProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  resultMessage: string;
  setResultMessage: (message: string) => void;
  thread: Thread;
  setThread: (thread: Thread) => void;
  modelIndex: number;
  setModelIndex: (index: number) => void;
  callAiAPI: (env: FunctionEnv) => void;
  isGenerating: boolean;
  setGenerating: (isGenerating: boolean) => void;
  resolutionIndex: number;
  setResolutionIndex: (index: number) => void;
  error: string;
  setError: (error: string) => void;
  contacts: Array<string>;
  setContacts: (contacts: Array<string>) => void;
  getResoniteContacts: () => Promise<void>;
}

const ThreadContext = createContext<ThreadContextProps | undefined>(undefined);

interface ThreadProviderProps {
  children: ReactNode;
}

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

export const ThreadProvider: React.FC<ThreadProviderProps> = ({ children }) => {
  const [prompt, setPrompt] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [thread, setThread] = useState<Thread>({ messages: [] });
  const [modelIndex, setModelIndex] = useState(0);
  const [isGenerating, setGenerating] = useState(false);
  const [resolutionIndex, setResolutionIndex] = useState(0);
  const [temperature, setTemperature] = useState(1);
  const [error, setError] = useState("");
  const [contacts, setContacts] = useState<Array<string>>([]);

  const callAiAPI = async (env: FunctionEnv) => {
    if (prompt.trim().length === 0) return;

    // 何故かAnthropicAPIを呼ぶときだけsetGenerating(true)が動かない
    console.log(`Generating status change to true.`);
    setGenerating(true);

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

      callGenerativeAI(updatedThread, env);
      return updatedThread;
    });
  };

  const callGenerativeAI = async (_thread: Thread, env: FunctionEnv) => {
    if (llmModel[modelIndex].type === "image") {
      setThread((prevThread) => {
        return {
          messages: [
            ...prevThread.messages,
            {
              role: "system",
              content: "Generating image. Wait a moment ...",
              type: "chat",
            },
          ],
        } as Thread;
      });
    }

    try {
      if (!env.userId)
        throw new Error("You must be logged in to use this service.");

      if (!contacts || contacts.length === 0) {
        await getResoniteContacts();
        throw new Error(
          "Initial authentication process was performed. Please execute again."
        );
      }

      if (
        !contacts.find((c) => c === env.userId) &&
        llmModel[modelIndex].tier !== "low"
      )
        throw new Error("Sorry, this model is only for author friends.");

      const result = await callGenerativeAIAPI({
        model: llmModel[modelIndex] as Model,
        thread: _thread,
        user: env.userId,
        resolution: AvailResolutions[resolutionIndex],
      });

      if (result instanceof OpenAIStream || result instanceof MessageStream) {
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

          switch (llmModel[modelIndex].vendor) {
            case "OpenAI":
              for await (const chunk of result) {
                updateLastMessageInThread(
                  (chunk as ChatCompletionChunk).choices[0]?.delta?.content ??
                    ""
                );
              }
              setGenerating(false);
              break;
            case "Anthropic":
              (result as MessageStream).on("text", (text) =>
                updateLastMessageInThread(text)
              );
              (result as MessageStream).on("end", () => setGenerating(false));
              break;
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
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setGenerating(false);
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

  const getResoniteContacts = async () => {
    try {
      const _contacts = await getContacts();
      setContacts(_contacts);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <ThreadContext.Provider
      value={{
        prompt,
        setPrompt,
        resultMessage,
        setResultMessage,
        thread,
        setThread,
        modelIndex,
        setModelIndex,
        callAiAPI,
        isGenerating,
        setGenerating,
        resolutionIndex,
        setResolutionIndex,
        error,
        setError,
        contacts,
        setContacts,
        getResoniteContacts,
      }}
    >
      {children}
    </ThreadContext.Provider>
  );
};

export const useThread = (): ThreadContextProps => {
  const context = useContext(ThreadContext);
  if (!context) {
    throw new Error("useThread must be used within a ThreadProvider");
  }
  return context;
};
