import { useEffect } from 'react';

import isEqual from 'lodash/isEqual';
import toInteger from 'lodash/toInteger';
import findLast from "lodash/findLast";
import toLower from "lodash/toLower";

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

const URL_QUERY_ID_NAME ='agent-id';
const LOCASTORAGE_ID_NAME = 'lead-agent';
const LOCASTORAGE_ID_DATE_EXP = 'lead-date-exp';

dayjs.extend(utc);

function App() {

  useEffect(() => {
    const currentUtc = dayjs().utc().format();
    const queryParams = new URLSearchParams(window.location.search);
    const idInUrl = toInteger(queryParams.get(URL_QUERY_ID_NAME));
    let idInLocal = toInteger(localStorage.getItem(LOCASTORAGE_ID_NAME));

    if (!idInUrl && !idInLocal) {
      const forceExpire = dayjs(currentUtc).utc().subtract(1, "year").format();
      localStorage.setItem(LOCASTORAGE_ID_NAME, null);
      localStorage.setItem(LOCASTORAGE_ID_DATE_EXP, forceExpire);
    } else {
      const pathArray = window.location.pathname.split("/");
      const findAgentsUrl = !!findLast(
        pathArray,
        (val) => toLower(val) === "agents"
      );

      // const expUtcInLocal = localStorage.getItem(LOCASTORAGE_ID_DATE_EXP);
      const add28Days = dayjs(currentUtc).utc().add(28, "day").format();

      if (!isEqual(idInUrl, idInLocal) && !!idInUrl) {
        localStorage.setItem(LOCASTORAGE_ID_NAME, idInUrl);
        localStorage.setItem(LOCASTORAGE_ID_DATE_EXP, add28Days);
      }

      idInLocal = toInteger(localStorage.getItem(LOCASTORAGE_ID_NAME));

      if(idInLocal && findAgentsUrl) {
        window.location.replace(`/agent/?${URL_QUERY_ID_NAME}=${idInLocal}&shared=true`);
      }

     //const difference = dayjs(currentUtc).diff(expUtcInLocal, 'days');

    }

    if(idInLocal && !idInUrl) {
      window.location.search += `${URL_QUERY_ID_NAME}=${idInLocal}&shared=true`;
    }

  }, []);

  return null;
}

export default App;
