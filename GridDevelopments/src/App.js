import { useEffect, useState, useCallback } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ContainerMain from "./Containers/main";

import AOS from "aos";

import "aos/dist/aos.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const queryClient = new QueryClient();

const URL_QUERY_ID_NAME = "agent-id";

function App() {

  const [urlIdAgent, setUrlIdAgent] = useState(null);
  const [verifyUrl, setVerifyUrl] = useState(false);

  const getUrlIdAgent = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const idParams = urlParams.get(URL_QUERY_ID_NAME);
    if(idParams) {
      setUrlIdAgent(idParams);
    }
    setVerifyUrl(true)
  },[setUrlIdAgent, setVerifyUrl])

  useEffect(() => {
    AOS.init({
      once: true
    });
    getUrlIdAgent()
  }, [getUrlIdAgent]);
  return (
    <QueryClientProvider client={queryClient}>
      {
        (verifyUrl) && <ContainerMain idAgent={urlIdAgent} />
      }
    </QueryClientProvider>
  );
}

export default App;
