import { useEffect } from 'react';

import isEqual from 'lodash/isEqual';
import toInteger from 'lodash/toInteger';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

const LOCASTORAGE_ID_NAME = 'lead-agent';
const LOCASTORAGE_ID_DATE_EXP = 'lead-date-exp';

dayjs.extend(utc);

function App() {

  useEffect(() => {
    
    console.log("SHARE AGENT");
    const queryParams = new URLSearchParams(window.location.search);
    const idInUrl = toInteger(queryParams.get('id'));
    const idInLocal = toInteger(localStorage.getItem(LOCASTORAGE_ID_NAME));

    // if(idInLocal > 0 && idInLocal > 0 && !isEqual(idInUrl, idInLocal)) {

      const currentUtc = dayjs().utc().format();
      const expUtcInLocal = localStorage.getItem(LOCASTORAGE_ID_DATE_EXP);
      const add28Days = dayjs(currentUtc).utc().add(28, 'day').format();

      localStorage.setItem(LOCASTORAGE_ID_NAME, idInUrl);
      localStorage.setItem(LOCASTORAGE_ID_DATE_EXP, add28Days);

    //}
      
  },[]);

  return (
    <></>
  );
}

export default App;
