import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import store from "./Store/store";
import { Provider } from "react-redux";

import ThemeGlobalProvider from "./MatineProvider";

import Main from "./Container";
const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeGlobalProvider>
          <Main />
        </ThemeGlobalProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
