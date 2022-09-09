import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import map from 'lodash/map';
import filter from 'lodash/filter';
import toLower from "lodash/toLower";
import includes from 'lodash/includes';
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

const filterByState = (value, data, statusUserLead) => {
  if(!value) return data;
  const getState = get(filter(statusUserLead, (val) => val?.value === value), ["0"], null);
  const getData = filter(data, (val) => toLower(val?.currentStatus) === toLower(getState?.label));
  return getData;
}

const filterByText = (value, data) => {
  if(!value) return data;
  const getData = filter(data, (val) => 
  includes(toLower(val.userLead?.firstName), toLower(value))
  ||
  includes(toLower(val.userLead?.lastName), toLower(value))
  || 
  includes(toLower(val.userLead?.email), toLower(value))
  )
  return getData;
}


export { formatReponseLeads, filterByState, filterByText };