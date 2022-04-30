import QuickSearch from './Components/QuickSearch'
import { QueryClient, QueryClientProvider } from 'react-query';

// react-query
import { ReactQueryDevtools } from 'react-query/devtools'
const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <QuickSearch />
      </div>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  )
}

export default App
