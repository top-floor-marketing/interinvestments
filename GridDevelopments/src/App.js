import { useEffect, useState, useCallback } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ContainerMain from "./Containers/main";

import findLast from "lodash/findLast";
import toLower from "lodash/toLower";

import AOS from "aos";

import "aos/dist/aos.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const queryClient = new QueryClient();

const URL_QUERY_ID_NAME = "agent-id";
const ID_LOCALSTORAGE_NAME = "lead-agent";

function App() {

  const [urlIdAgent, setUrlIdAgent] = useState(null);
  const [verifyUrl, setVerifyUrl] = useState(false);

  const getUrlIdAgent = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const idParams = parseInt(urlParams.get(URL_QUERY_ID_NAME));
    const idInLocalStorage = parseInt(localStorage.getItem(ID_LOCALSTORAGE_NAME));
    const pathArray = window.location.pathname.split("/");
    const findAgentsUrl = !!findLast(
      pathArray,
      (val) => toLower(val) === "agent" || toLower(val) === "agents"
    );
    if(findAgentsUrl) {
      setUrlIdAgent(idParams || idInLocalStorage);
    }
    setVerifyUrl(true);
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
