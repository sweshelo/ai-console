import { ThreadProvider } from "./ai-console/context/ThreadContext";
import { Main } from "./ai-console/intex";

export const App = () => {
  return (
    <ThreadProvider>
      <Main />
    </ThreadProvider>
  );
};
