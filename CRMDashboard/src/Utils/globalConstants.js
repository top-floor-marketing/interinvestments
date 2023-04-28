
import {decode} from 'html-entities';

export const LOCAL_STORAGE = {
  TOKEN: "crm-token",
  REFRESH: "crm-refresh-token",
  USER: "crm-user-id",
  ROUTE: "crm-route-name",
  LEAD_DETAIL_ID: "crm-lead-detail-id",
  AGENT: "crm-agent"
};

export const removeTags = (str) => {

  if ((str === null) || (str === ''))
      return '';

  let stringEmpty = ''+str.trim();

  stringEmpty = stringEmpty.slice(0, 3000);

  // Regular expression to identify HTML tags in 
  // the input string. Replacing the identified 
  // HTML tag with a null string.
  const addLineBreak = stringEmpty.replace(/<\/p>/g, "\r\n");
  return decode(addLineBreak.replace(/(<([^>]+)>)/ig, '')).trim();

}
