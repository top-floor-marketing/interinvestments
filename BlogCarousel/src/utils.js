import DOMPurify from 'dompurify';

export const removeHtmlInString = (htmlString = "") => {
  let clean = DOMPurify.sanitize(htmlString);
  const regex = /(<([^>]+)>)/gi;
  return clean.replace(regex, "");
};

export const maxString = (text = "", max = 100) => {
  const lengthText = text.length;
  if (lengthText > max) {
    return text.substring(0, max).concat(" ...");
  }
  return text;
};
