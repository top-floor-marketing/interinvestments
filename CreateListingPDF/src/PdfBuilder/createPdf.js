import { useEffect, memo, useCallback } from 'react';
import { usePDF } from '@react-pdf/renderer';

import PdfDocument  from './PdfDocument';

import get from 'lodash/get';

import {
    incrementNavigationProgress,
    stopNavigationProgress,
} from '@mantine/nprogress';


const ID_LINK_DOWNLOAD_PDF = 'ID_LINK_DOWNLOAD_PDF';

const CreatePdf = ({ listing, agent, onClose }) => {
  const [{ loading, error, url}] = usePDF({ document: <PdfDocument listing={listing} agent={agent} /> });

  const titleListing = get(listing, ["title"], 'Interinvestments');

  const forceDownload = useCallback(() => {
      const getElement = document.getElementById(ID_LINK_DOWNLOAD_PDF);
        // Trigger the download by simulating click
      if(getElement) getElement.click()
      incrementNavigationProgress(100);
      stopNavigationProgress();
      onClose();
  }, [onClose]);

  useEffect(() => {
    if(!loading && url) {
        incrementNavigationProgress(30);
        forceDownload();
    } else if (error) {
        onClose();
    }
  },[loading, error, url, forceDownload, onClose]);

  return (
    <a id={ID_LINK_DOWNLOAD_PDF} href={url} download={`${titleListing}.pdf`} 
    style={{ display: "none", width: "0px", height: "0px", position: "absolute"}}>
      {titleListing}
    </a>
  );
}

export default memo(CreatePdf);