import { useEffect } from "react";

import {
  incrementNavigationProgress,
  stopNavigationProgress,
  resetNavigationProgress
} from '@mantine/nprogress';

import useGetListingInfo from "./useGetListingInfo";
import DocumentPage from "./documentPage";

// https://react-pdf.org/advanced#using-the-usepdf-hook
const PdfBuilder = ({ idListing , idAgent, idElement = null, onClose }) => {

  const { data, error, isLoading } = useGetListingInfo({ idListing , idAgent });

  useEffect(() => {
    resetNavigationProgress();
    incrementNavigationProgress(10);
    setTimeout(() => {
      incrementNavigationProgress(10);
    }, 1000);
  }, [])

  useEffect(() => {
    const doomElement = document.getElementById(idElement);
    if(doomElement) {
      doomElement.setAttribute("disabled", "");
    }
    if(error) {
      onClose();
    }
    return () => {
      stopNavigationProgress();
      const doomElement = document.getElementById(idElement);
      if(doomElement) {
        doomElement.removeAttribute("disabled");
      }
    }
  }, [idElement, error, onClose]);

  return (
    (error || isLoading) ? null : <DocumentPage {...data} onClose={onClose} />
  );
}

export default PdfBuilder;
