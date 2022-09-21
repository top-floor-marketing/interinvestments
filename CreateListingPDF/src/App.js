import { useEffect, useState, useCallback } from 'react';

import { addListener, removeListener } from './eventListener';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationsProvider } from "@mantine/notifications";

import PdfBuilder from './PdfBuilder';

const queryClient = new QueryClient();

function App() {
  const [isMounted, setIsMounted] = useState(false);
  const [dataForPdf, setDataForPdf] = useState(false);
  const [isRenderBuilder, setIsRenderBuilder] = useState(false);

  const closeRenderBuilder = () => {
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
      removeListener(renderBuilder);
    };
  }, [isMounted, renderBuilder]);

  // Hydration SSR for plugin in Wordpress
  if (!isMounted) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <NotificationsProvider
        position="bottom-center"
        zIndex={9999}
        autoClose={false}
      >
        <>
          <div
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
                    idListing: 338,
                    idAgent: 30,
                    idElement: "btnTest"
                  },
                })
              }
            >
              Create PDF
            </button>
          </div>
          {isRenderBuilder && (
            <PdfBuilder {...dataForPdf} onClose={closeRenderBuilder} />
          )}
        </>
      </NotificationsProvider>
    </QueryClientProvider>
  );

  // return isRenderBuilder ? (
  //   <PdfBuilder {...dataForPdf} onClose={closeRenderBuilder} />
  // ) : null;
}

export default App;
