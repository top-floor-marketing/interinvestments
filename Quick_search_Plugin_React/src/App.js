
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ContainerComponts from './Components/ContainerComponts'
// store
import ProviderStore from './Store/ProviderStore';
// react-query

const queryClient = new QueryClient();

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
