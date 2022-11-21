import { useEffect, useState, useCallback } from 'react';

import { addListener, removeListener } from './eventListener';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { MantineProvider } from '@mantine/core';
import { NavigationProgress, stopNavigationProgress } from '@mantine/nprogress';

import PdfBuilder from './PdfBuilder';

const queryClient = new QueryClient();

function App() {
  const [isMounted, setIsMounted] = useState(false);
  const [dataForPdf, setDataForPdf] = useState(null);
  const [isRenderBuilder, setIsRenderBuilder] = useState(false);

  const closeRenderBuilder = () => {
    setDataForPdf(null);
    setIsRenderBuilder(false);
  };

  const renderBuilder = useCallback(({ detail }) => {
    // idListing: int, idAgent: int, idElement: string
    setDataForPdf(detail);
    setIsRenderBuilder(true);
  }, []);

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    } else {
      addListener(renderBuilder);
    }
    return () => {
      stopNavigationProgress();
      removeListener(renderBuilder);
    };
  }, [isMounted, renderBuilder]);

  // Hydration SSR for plugin in Wordpress
  if (!isMounted) return null;
  // 338 2570 328
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <NavigationProgress size='10px' zIndex={9999} color={"#ffb839"} />
        <>
         {/*  <div
            style={{
              width: "100%",
              height: "50px",
              padding: "2rem",
              backgroundColor: "#8BA6A9",
            }}
          >
            <button
              id="btnTest"
              onClick={() =>
                renderBuilder({
                  detail: {
                    idListing: 3790,
                    idAgent: 30,
                    idElement: "btnTest"
                  },
                })
              }
            >
              Create PDF
            </button>
          </div> */}
          {isRenderBuilder && (
            <PdfBuilder {...dataForPdf} onClose={closeRenderBuilder} />
          )}
        </>
      </MantineProvider>
    </QueryClientProvider>
  );

}

export default App;
