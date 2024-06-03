import { Model } from "../types";

export const llmModel: Model[] = [
  { vendor: "OpenAI", name: "gpt-3.5-turbo", type: "chat" },
  { vendor: "OpenAI", name: "gpt-4", type: "chat" },
  { vendor: "OpenAI", name: "gpt-4o", type: "chat" },
  { vendor: "Anthropic", name: "claude-3-haiku-20240307" },
  { vendor: "Anthropic", name: "claude-3-opus-20240229" },
  { vendor: "Anthropic", name: "claude-3-sonnet-20240229" },
  { vendor: "OpenAI", name: "dall-e-3", type: "image" },
];
