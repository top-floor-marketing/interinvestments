import { QueryClient, QueryClientProvider } from "react-query";

import store from "./Store/store";
import { Provider } from "react-redux";

import ThemeGlobalProvider from "./MatineProvider";
import { ReactQueryDevtools } from 'react-query/devtools'

import Main from "./Container/main";
const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeGlobalProvider>
          <Main />
        </ThemeGlobalProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
