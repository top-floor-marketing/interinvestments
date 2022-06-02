import { useEffect } from "react";
import ContainerBlogView from './components/ContainerBlogView'
// react query
import { QueryClient, QueryClientProvider } from "react-query";
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
        <ContainerBlogView />
      </QueryClientProvider>
    </div>
  )
}

export default App
