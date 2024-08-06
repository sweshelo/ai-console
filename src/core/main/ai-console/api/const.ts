import { Model, Resolution } from "../types";

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
    name: "gpt-4o",
    shortName: "GPT-4o",
    description: "OpenAI Latest",
    type: "chat",
  },
  {
    vendor: "OpenAI",
    name: "gpt-4o-mini",
    shortName: "GPT-4o Mini",
    description: "Most cost-efficient small model",
    type: "chat",
  },
  {
    vendor: "Anthropic",
    name: "claude-3-5-sonnet-20240620",
    shortName: "Claude 3.5 Sonnet",
    description: "Most Intelligent Claude",
    type: "chat",
  },
  {
    vendor: "OpenAI",
    name: "dall-e-2",
    shortName: "Dall-E 2",
    description: "Previous generation Dall-E",
    type: "image",
  },
  {
    vendor: "OpenAI",
    name: "dall-e-3",
    shortName: "Dall-E 3",
    description: "Image generation",
    type: "image",
  },
];

export const AvailResolutions: Resolution[] = [
  {
    value: "256x256",
    model: ["dall-e-2"],
  },
  {
    value: "512x512",
    model: ["dall-e-2"],
  },
  {
    value: "1024x1024",
    model: ["dall-e-2", "dall-e-3"],
  },
  {
    value: "1792x1024",
    model: ["dall-e-3"],
  },
  {
    value: "1024x1792",
    model: ["dall-e-3"],
  },
];
