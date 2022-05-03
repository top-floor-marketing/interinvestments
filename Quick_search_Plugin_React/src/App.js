import QuickSearch from './Components/QuickSearch'
import MenuQuickSearch from './Components/MenuQuickSearch'
import { QueryClient, QueryClientProvider } from 'react-query';
// store
import ProviderStore from './Store/ProviderStore';
// react-query
// import { ReactQueryDevtools } from 'react-query/devtools'
const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <ProviderStore>
        <QuickSearch />
        <MenuQuickSearch />
      </ProviderStore>
      {
        // <ReactQueryDevtools initialIsOpen={false} />
      }
    </QueryClientProvider>
  )
}

export default App
