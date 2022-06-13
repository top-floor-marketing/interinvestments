import { useEffect } from "react";
// react query
import { QueryClient, QueryClientProvider } from "react-query";
// animation aos
import AOS from "aos";
import "aos/dist/aos.css";
// components
import Main from './components/Container/Main'

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
