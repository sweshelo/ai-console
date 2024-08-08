import OpenAI from "openai";
import {
  MessageForOpenAIAPI,
  Message,
  Thread,
  Model,
  MessageForAnthropicAPI,
  Resolution,
} from "../types";
import Anthropic from "@anthropic-ai/sdk";
import { FunctionEnv } from "../../../../lib/mirage-x/common/interactionEvent";
import { ImageGenerateParams } from "openai/resources";
import { useThread } from "../context/ThreadContext";

type callGenerativeAIAPIProps = {
  model: Model;
  thread: Thread;
  user: FunctionEnv["userId"];
  resolution?: Resolution;
};

export const callGenerativeAIAPI = async (props: callGenerativeAIAPIProps) => {
  switch (props.model.vendor) {
    case "OpenAI":
      return props.model.type === "image"
        ? callOpenAIImageGenerationAPI(props)
        : callOpenAIAPI(props);
    case "Anthropic":
      return callAnthropicAPI(props);
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
    user: props.user,
  });
};

const callAnthropicAPI = async (props: callGenerativeAIAPIProps) => {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });
  return anthropic.messages.stream({
    max_tokens: 1024,
    messages: props.thread.messages.map((m) => ({
      content: m.content,
      role: m.role === "system" ? "assistant" : m.role,
    })) as MessageForAnthropicAPI[],
    model: props.model.name,
  });
};

const callOpenAIImageGenerationAPI = async (
  props: callGenerativeAIAPIProps
) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  return await openai.images.generate({
    model: props.model.name,
    prompt: props.thread.messages[props.thread.messages.length - 1].content,
    user: props.user,
    size: (props.resolution?.value ?? "512x512") as ImageGenerateParams["size"],
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
