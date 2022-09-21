import { useEffect } from "react";
// import { showNotification } from "@mantine/notifications";

import useGetListingInfo from "./useGetListingInfo";

import get from 'lodash/get';
// https://react-pdf.org/advanced#using-the-usepdf-hook
const PdfBuilder = ({ idListing , idAgent, idElement = null, onClose }) => {

  const { data, error, isLoading } = useGetListingInfo({ idListing , idAgent });

  useEffect(() => {
    const doomElement = document.getElementById(idElement);
    if(doomElement) {
      doomElement.setAttribute("disabled", "");
    }
    if(error) {
      onClose();
    }
    return () => {
      const doomElement = document.getElementById(idElement);
      if(doomElement) {
        doomElement.removeAttribute("disabled");
      }
    }
  }, [idElement, error, onClose]);

  return (
    <></>
  );
}

export default PdfBuilder;
