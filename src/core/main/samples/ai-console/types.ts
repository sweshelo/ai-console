export type Model = {
  vendor: "OpenAI" | "Anthropic";
  name: string;
};

export type Message = {
  role: "system" | "user" | "assistant";
  content: string;
  model?: Model;
  author?: string;
};

export type MessageForOpenAIAPI = Omit<Message, "ai" | "author">;

export type Thread = {
  messages: Message[];
};
