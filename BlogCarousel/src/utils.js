export const removeHtmlInString = (htmlString = "") => {
  const regex = /(<([^>]+)>)/gi;
  return htmlString.replace(regex, "");
};

export const maxString = (text = "", max = 100) => {
  const lengthText = text.length;
  if (lengthText > max) {
    return text.substring(0, max).concat(" ...");
  }
  return text;
};
