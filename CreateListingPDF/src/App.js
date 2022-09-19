import { useEffect, useState, useCallback } from 'react';

import { addListener, removeListener } from './eventListener';

import PdfBuilder from './PdfBuilder';

function App() {

  const [isMounted, setIsMounted] = useState(false);
  const [isRenderBuilder, setIsRenderBuilder] = useState(false);

  const renderBuilder = useCallback((val) => {
    console.log("renderBuilder ", val);
    setIsRenderBuilder(true);
  }, []);

  useEffect(() => {
    if(!isMounted) {
      setIsMounted(true);
    } else {
      addListener(renderBuilder);
    }

    return () => {
      removeListener(renderBuilder);
    }
  }, [isMounted, renderBuilder]);

  if(!isMounted)
    return null;

  return isRenderBuilder ? <PdfBuilder /> : null;
}

export default App;
