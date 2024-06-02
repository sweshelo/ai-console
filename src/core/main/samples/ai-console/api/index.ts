import OpenAI from "openai";
import { MessageForOpenAIAPI, Message, Thread, Model } from "../types";

type callGenerativeAIAPIProps = {
  model: Model;
  thread: Thread;
};

export const callGenerativeAIAPI = async (props: callGenerativeAIAPIProps) => {
  switch (props.model.vendor) {
    case "OpenAI":
      return callOpenAIAPI(props);

    case "Anthropic":
      break;
  }
};

const callOpenAIAPI = async (props: callGenerativeAIAPIProps) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  return await openai.chat.completions.create({
    model: props.model.name,
    messages: props.thread.messages as MessageForOpenAIAPI[],
    stream: true,
  });
};

export const getColorFromRole = (
  role: Message["role"]
): [number, number, number, number] => {
  switch (role) {
    case "user":
      return [0.4, 0.4, 0.4, 1.0];
    case "assistant":
      return [0.4, 0.4, 0.9, 1.0];
    case "system":
      return [0.2, 0.2, 0.5, 1.0];
  }
};
