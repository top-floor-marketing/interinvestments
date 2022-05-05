export const removeHtmlInString = (htmlString = "") => {
  const regex = /(<([^>]+)>)/gi;
  return htmlString.replace(regex, "");
};
