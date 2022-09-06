import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import filter from "lodash/filter";
import map from 'lodash/map';
import reduce from "lodash/reduce";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const formatReponseLeads = (response) => {
    if (!response || isEmpty(response)) return [];
    const leadsList = get(response, ["dataAgent", "0", "statuses"], []);
    if (isEmpty(leadsList)) return [];

    console.log("dayjs ", dayjs().format());
    console.log("utc ", dayjs.utc().format());
    return map(leadsList, (val) => {
        const datesForStatus = map(get(val, ["status"], []), (val) => ({
          parseDate: dayjs(val.date),
          date: val.date,
          status: val.status,
        }));
        console.log("datesForStatus ", datesForStatus);
        const finalStatus = reduce(
          datesForStatus,
          (result, value) => {
            if (isEmpty(result)) return { ...value }

            console.log("result", result);
            console.log("value", value);

            const isAfter = dayjs(value.date).isAfter(dayjs(result.date)); 

            console.log("isAfter ", isAfter);
            return {
                ...value,
            };
          },
          {}
        );    
        return {
          ...val,
          finalStatus: finalStatus,
        };
    });
}


export { formatReponseLeads };