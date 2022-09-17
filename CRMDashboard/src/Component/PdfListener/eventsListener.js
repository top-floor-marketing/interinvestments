import * as dotenv from 'dotenv';
dotenv.config();

const triggerPdfListing = ({ idListing = null, idAgent = null }) => {
  const eventType = process.env.REACT_APP_PDF_LISTING_LISTENER;
  if(!eventType || !idListing) return null;
  const event = new CustomEvent(eventType, { data: { idListing, idAgent } });
  document.dispatchEvent(event);
}

export { triggerPdfListing };