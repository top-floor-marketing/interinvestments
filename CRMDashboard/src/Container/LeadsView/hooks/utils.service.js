import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import map from 'lodash/map';
/* 
import filter from "lodash/filter";
import reduce from "lodash/reduce";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc); */

const formatReponseLeads = (response) => {
    if (!response || isEmpty(response)) return [];
    const leadsList = get(response, ["dataAgent", "0", "statuses"], []);
    if (isEmpty(leadsList)) return [];
    const agentId =  get(response, ["dataAgent", "0", "databaseId"], []);
    return map(leadsList, (val) => {
      return {
        ...val,
        agentId
      }
    });
   /*  return map(leadsList, (val) => {
        const datesForStatus = map(get(val, ["status"], []), (val) => ({
          parseDate: dayjs(val.date),
          date: val.date,
          status: val.status,
        }));
        const finalStatus = reduce(
          datesForStatus,
          (result, value) => {
            if (isEmpty(result)) return { ...value }
            const isAfter = dayjs(value.date).isAfter(dayjs(result.date)); 
            if(isAfter) {
              return {
                ...value,
              };
            }
            return {
              ...result
            }
          },
          {}
        );
        return {
          ...val,
          finalStatus: finalStatus,
        };
    }); */
}


export { formatReponseLeads };