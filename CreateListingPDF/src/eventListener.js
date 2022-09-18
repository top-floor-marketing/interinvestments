 const PDF_LISTING_LISTENER = process.env.REACT_APP_PDF_LISTING_LISTENER;

 const addListener = (listener)  => {
    if (PDF_LISTING_LISTENER && listener)
      document.addEventListener(PDF_LISTING_LISTENER, listener);
 }

 const removeListener = (listener) => {
    if (PDF_LISTING_LISTENER && listener)
      document.removeEventListener(PDF_LISTING_LISTENER, listener);
 }

 // dispatchEvent is trigger for other plugins
//  function publish(eventName, data) {
//    const event = new CustomEvent(eventName, { detail: data });
//    document.dispatchEvent(event);
//  }

 export { addListener, removeListener };