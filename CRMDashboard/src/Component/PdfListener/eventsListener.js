const PDF_LISTING_LISTENER = process.env.REACT_APP_PDF_LISTING_LISTENER;

const triggerPdfListing = ({ idListing = null, idAgent = null }) => {
  const eventType = PDF_LISTING_LISTENER;
  if(!eventType || !idListing) return null;
  console.log("Trigger ", eventType);
  console.log("values ", { idListing, idAgent });
  const event = new CustomEvent(eventType, { data: { idListing, idAgent } });
  document.dispatchEvent(event);
}

export { triggerPdfListing };