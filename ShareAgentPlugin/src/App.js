import { useEffect } from 'react';

import isEqual from 'lodash/isEqual';
import toInteger from 'lodash/toInteger';
import findLast from "lodash/findLast";
import toLower from "lodash/toLower";
import isNaN from 'lodash/isNaN';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

const URL_QUERY_ID_NAME = 'agent-id';
const LOCASTORAGE_ID_NAME = 'lead-agent';
const LOCASTORAGE_ID_LAST_FORCE_ID = 'lead-date-force-id';

dayjs.extend(utc);

function App() {

  useEffect(() => {

    const queryParams = new URLSearchParams(window.location.search);
    const pathArray = window.location.pathname.split("/");

    const findBlogUrl = !!findLast(
      pathArray,
      (val) => toLower(val) === "blog"
    );

    if (!findBlogUrl) {
      const findAgentsUrl = !!findLast(
        pathArray,
        (val) => toLower(val) === "agents"
      );

      const currentUtc = dayjs().utc().format();

      const idInUrl = toInteger(queryParams.get(URL_QUERY_ID_NAME));
      let idInLocal = toInteger(localStorage.getItem(LOCASTORAGE_ID_NAME));

      if (!idInUrl && !idInLocal) {
        localStorage.setItem(LOCASTORAGE_ID_NAME, null);
      } else {

        if (!isEqual(idInUrl, idInLocal) && idInUrl) {
          localStorage.setItem(LOCASTORAGE_ID_NAME, idInUrl);
        }

        idInLocal = toInteger(localStorage.getItem(LOCASTORAGE_ID_NAME));

        if (idInLocal && findAgentsUrl) {
          window.location.replace(`/agent/?${URL_QUERY_ID_NAME}=${idInLocal}&shared=true`);
        }

      }

      const lasForceId = localStorage.getItem(LOCASTORAGE_ID_LAST_FORCE_ID);
      let differenceInMinute = dayjs(currentUtc).diff(lasForceId, 'minute');

      if (isNaN(differenceInMinute) && !idInUrl) {
        differenceInMinute = 1;
      }

      if (idInLocal && !idInUrl && !findAgentsUrl && differenceInMinute > 0) {
        localStorage.setItem(LOCASTORAGE_ID_LAST_FORCE_ID, currentUtc);
        window.location.search += `${URL_QUERY_ID_NAME}=${idInLocal}&shared=true`;
      }

      if (idInLocal) {
        Array.from(document.querySelectorAll("#menu-primary-menu>.menu-item>a")).map((x) => {
          const text = toLower(x.textContent || x.innerText);
          return x.href = (text !== "login") ? x.href + `?${URL_QUERY_ID_NAME}=${idInLocal}&shared=true` : x.href
        }
        );
      }
    }

  }, []);

  return null;
}

export default App;
