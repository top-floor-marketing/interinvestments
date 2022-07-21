import { useEffect } from "react";
// components
import Main from './components/container/Main'
// react query
import { QueryClient, QueryClientProvider } from "react-query";
// redux
import { Provider } from 'react-redux'
import { store } from './components/store'
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
    <Provider store={store}>
      <div className='App'>
        <QueryClientProvider client={queryClient}>
          <Main />
        </QueryClientProvider>
      </div>
    </Provider>
  )
}

export default App
