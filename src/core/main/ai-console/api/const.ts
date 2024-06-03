import { Model } from "../types";

export const llmModel: Model[] = [
  {
    vendor: "OpenAI",
    name: "gpt-3.5-turbo",
    shortName: "GPT-3.5",
    description: "Basic model",
    type: "chat",
  },
  {
    vendor: "OpenAI",
    name: "gpt-4",
    shortName: "GPT-4",
    description: "More Intelligent",
    type: "chat",
  },
  {
    vendor: "OpenAI",
    name: "gpt-4o",
    shortName: "GPT-4o",
    description: "OpenAI Latest",
    type: "chat",
  },
  {
    vendor: "Anthropic",
    name: "claude-3-haiku-20240307",
    shortName: "Claude3 haiku",
    description: "Fastest Claude",
    type: "chat",
  },
  {
    vendor: "Anthropic",
    name: "claude-3-sonnet-20240229",
    shortName: "Claude3 sonnet",
    description: "Balanced Claude",
    type: "chat",
  },
  {
    vendor: "Anthropic",
    name: "claude-3-opus-20240229",
    shortName: "Claude3 opus",
    description: "Most Intelligent Claude",
    type: "chat",
  },
  {
    vendor: "OpenAI",
    name: "dall-e-3",
    shortName: "Dall-E 3",
    description: "Image generation",
    type: "image",
  },
];
