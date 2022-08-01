import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import store from "./Store/store";
import { Provider } from "react-redux";

import { NotificationsProvider } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';

import ThemeGlobalProvider from "./MatineProvider";

import Main from "./Container";
const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeGlobalProvider>
          <NotificationsProvider autoClose={4000} limit={2} position="top-right" zIndex={9999}>
            <ModalsProvider>
              <Main />
            </ModalsProvider>
          </NotificationsProvider>
        </ThemeGlobalProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
