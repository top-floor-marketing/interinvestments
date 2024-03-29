const PDF_LISTING_LISTENER = process.env.REACT_APP_PDF_LISTING_LISTENER;

// CustomEvent Javascript interface
const triggerPdfListing = ({ idListing = null, idAgent = null, idElement }) => {
  const eventType = PDF_LISTING_LISTENER;
  if(!eventType || !idListing) return null;
  const event = new CustomEvent(eventType, { detail: { idListing, idAgent, idElement } });
  document.dispatchEvent(event);
}

export { triggerPdfListing };