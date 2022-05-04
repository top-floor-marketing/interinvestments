
import { QueryClient, QueryClientProvider } from 'react-query';
import ContainerComponts from './Components/ContainerComponts'
// store
import ProviderStore from './Store/ProviderStore';
// react-query
// import { ReactQueryDevtools } from 'react-query/devtools'
const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <ProviderStore>
        <ContainerComponts />
      </ProviderStore>
    </QueryClientProvider>
  )
}

export default App
