import { useEffect } from "react";
// react query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// components
import Main from './components/Container/Main';

// animation aos
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const queryClient = new QueryClient();
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <div className='App'>
      <QueryClientProvider client={queryClient}>
        <Main />
      </QueryClientProvider>
    </div>
  )
}

export default App
