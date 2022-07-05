import { useEffect } from "react";

import { QueryClient, QueryClientProvider } from "react-query";

import ContainerMain from "./Containers/main";

import AOS from "aos";

import "aos/dist/aos.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    AOS.init({
      once: true
    });
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <ContainerMain />
    </QueryClientProvider>
  );
}

export default App;
