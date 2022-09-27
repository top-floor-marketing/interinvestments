import { useEffect } from 'react';

import isEqual from 'lodash/isEqual';
import toInteger from 'lodash/toInteger';
import toLower from "lodash/toLower";
import isEmpty from 'lodash/isEmpty';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

const URL_SHARED_FLAG = 'shared';
const URL_QUERY_ID_NAME = 'agent-id';
const LOCASTORAGE_ID_NAME = 'lead-agent';
const LOCASTORAGE_AGENT_LAST_DATE = 'agent-last-date-url-shared';
const TOKEN_CRM = 'crm-token';
const USER_CRM = "crm-user-id";

dayjs.extend(utc);

function App() {

  useEffect(() => {

    const queryParams = new URLSearchParams(window.location.search);
    // const pathArray = window.location.pathname.split("/");

    const currentUtc = dayjs().utc().format();
    const isShared = (toLower(queryParams.get(URL_SHARED_FLAG)) === 'true');
    const idInUrl = toInteger(queryParams.get(URL_QUERY_ID_NAME));
    let idInLocal = toInteger(localStorage.getItem(LOCASTORAGE_ID_NAME));
    let tokenCrm = localStorage.getItem(TOKEN_CRM);
    let userCrm = localStorage.getItem(USER_CRM);

    const isAgentUser = (tokenCrm && userCrm);
    const isValidUrl = (isShared && idInUrl);

    try {
      if (isValidUrl) {
        setTimeout(() => {
          const arrayMenu = document.querySelectorAll("#menu-primary-menu>.menu-item>a");
          if(!isEmpty(arrayMenu)) {
            arrayMenu.forEach((x) => {
              const text = toLower(x.textContent || x.innerText);
              const isAgentsUrl = (text === "agents");
              if(!isAgentsUrl) {
                x.href = (text !== "login") ? `${x.href}?${URL_QUERY_ID_NAME}=${idInUrl}&${URL_SHARED_FLAG}=true` : x.href;
              } else {
                // x.href = `/agent/?${URL_QUERY_ID_NAME}=${idInUrl}&${URL_SHARED_FLAG}=true`;
                x.href = `${x.href}?${URL_QUERY_ID_NAME}=${idInUrl}&${URL_SHARED_FLAG}=true`;
                x["innerText"] = (isAgentUser) ? 'My Bio' : x["innerText"];
              }
            });
          }
          const arrayFooter = document.querySelectorAll(".footerFlex>a");
          if(!isEmpty(arrayMenu)) { 
            arrayFooter.forEach((x) => {
              const text = toLower(x.textContent || x.innerText);
              const isAgentsUrl = (text === "agents");
              if(!isAgentsUrl) { 
                x.href = (text !== "login") ? `${x.href}?${URL_QUERY_ID_NAME}=${idInUrl}&${URL_SHARED_FLAG}=true` : x.href;
              } else {
                // x.href = `/agent/?${URL_QUERY_ID_NAME}=${idInUrl}&${URL_SHARED_FLAG}=true`;
                x.href = `${x.href}?${URL_QUERY_ID_NAME}=${idInUrl}&${URL_SHARED_FLAG}=true`;
                x["innerText"] = (isAgentUser) ? 'My Bio' : x["innerText"];
              }
            });
          }
        }, 1000)
      }
    } catch(e) {
      console.log('shared = '+e);
    }

    if (!isEqual(idInUrl, idInLocal) && isValidUrl) {
      localStorage.setItem(LOCASTORAGE_ID_NAME, idInUrl);
      localStorage.setItem(LOCASTORAGE_AGENT_LAST_DATE, currentUtc);
    }

    /* const findBlogUrl = !!findLast(
      pathArray,
      (val) => toLower(val) === "blog"
    ); */

  }, []);

  return null;
}

export default App;
