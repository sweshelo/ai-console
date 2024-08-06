export type Model = {
  vendor: "OpenAI" | "Anthropic";
  name: string;
  type?: "chat" | "image";
  shortName: string;
  description: string;
};

export type Message = {
  role: "system" | "user" | "assistant";
  content: string;
  type: "chat" | "image";
  model?: Model;
  author?: string;
  uri?: string;
};

export type MessageForOpenAIAPI = Omit<Message, "ai" | "author">;
export type MessageForAnthropicAPI = Omit<Message, "role" | "ai" | "author"> & {
  role: "user" | "assistant";
};

export type Thread = {
  messages: Message[];
};

export type Resolution = {
  value: string;
  model: Model["name"][];
};
