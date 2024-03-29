import { useEffect } from "react";
// components
import Main from './components/container/Main'
// react query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// redux
import { Provider } from 'react-redux'
import { store } from './components/store'
// animation aos
import AOS from "aos";

import "aos/dist/aos.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function App() {
  const queryClient = new QueryClient();
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Main />
        </QueryClientProvider>
    </Provider>
  )
}

export default App
