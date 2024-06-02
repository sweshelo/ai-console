export type Model = {
  vendor: "OpenAI" | "Anthropic";
  name: string;
  type?: "chat" | "image";
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

export type Thread = {
  messages: Message[];
};
