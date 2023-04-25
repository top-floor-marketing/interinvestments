import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import StoreProvider from './GlobalStore/storeProvider';

import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';

import ThemeGlobalProvider from './MatineProvider';

import Main from './Views/Main';
const queryClient = new QueryClient();

function App() {
  return (
    <StoreProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeGlobalProvider>
          <Notifications
            autoClose={5000}
            limit={3}
            position='top-right'
            zIndex={9999}
          />
          <ModalsProvider>
            <Main />
          </ModalsProvider>
        </ThemeGlobalProvider>
      </QueryClientProvider>
    </StoreProvider>
  );
}

export default App;
