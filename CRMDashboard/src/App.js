import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import StoreProvider from './GlobalStore/storeProvider';

import { NotificationsProvider } from '@mantine/notifications';

import ThemeGlobalProvider from "./MatineProvider";

import Main from "./Container/MainView";
const queryClient = new QueryClient();

function App() {
  return (
    <StoreProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeGlobalProvider>
          <NotificationsProvider autoClose={3000} limit={2} position="top-right" zIndex={9999}>
              <Main />     
          </NotificationsProvider>
        </ThemeGlobalProvider>
      </QueryClientProvider>
    </StoreProvider>
  );
}

export default App;
