import isEmpty from "lodash/isEmpty";
import get from "lodash/get";
import map from 'lodash/map';
import filter from 'lodash/filter';
import toLower from "lodash/toLower";
import includes from 'lodash/includes';
import forEach from 'lodash/forEach';
import findIndex from 'lodash/findIndex';
import orderBy from 'lodash/orderBy';

const formatReponseSingleAgentLeads = (response) => {
  if (!response || isEmpty(response)) return [];
  const leadsList = get(response, ["dataAgent", "0", "statuses"], []);
  if (isEmpty(leadsList)) return [];
  const agentId = get(response, ["dataAgent", "0", "databaseId"], []);
  const fullData = map(leadsList, (val) => {
    return {
      ...val,
      agentId
    }
  });
  return fullData;
}

const formatResponseFullAgents = (response, adminId) => {
  if (!response || isEmpty(response)) return [];
  const leadsList = get(response, ["dataAgent"], []);
  if (isEmpty(leadsList)) return [];
  const fullData = [];

  forEach(leadsList, (valUserLead) => {

    if (!isEmpty(get(valUserLead, ["statuses"], []))) {

      let newLead = {
        userLead: get(valUserLead, ["statuses", "0", "userLead"], {}),
        allAgentsStatus: []
      }

      let isOfficeLead = false;

      forEach(get(valUserLead, ["statuses"], []), (valStatusLead) => {

        newLead.allAgentsStatus.push({
          currentStatus: get(valStatusLead, ["currentStatus"], {}),
          agentId: get(valStatusLead, ["agent", "databaseId"], null),
          ...get(valStatusLead, ["agent"], {}),
        });

        isOfficeLead = get(valStatusLead, ["agent", "databaseId"], 0) === adminId

      });

      fullData.push({ ...newLead, isOfficeLead });

    }

  });

  return orderBy(fullData, ['isOfficeLead'], ['desc']);
}

const filterByState = (value, data, statusUserLead, isAdminLeadView) => {
  if (!value) return data;
  const getState = get(filter(statusUserLead, (val) => val?.value === value), ["0"], null);
  if (isAdminLeadView)
    return filter(data, (val) =>
      findIndex(val?.allAgentsStatus, (valAgents) => {
        return toLower(valAgents?.currentStatus) === toLower(getState?.label);
      }) > -1);
  else
    return filter(data, (val) => toLower(val?.currentStatus) === toLower(getState?.label));
}

const filterByText = (value, data) => {
  if (!value) return data;
  const getData = filter(data, (val) =>
    includes(toLower(val.userLead?.firstName), toLower(value))
    ||
    includes(toLower(val.userLead?.lastName), toLower(value))
    ||
    includes(toLower(val.userLead?.email), toLower(value))
  )
  return getData;
}


export { formatReponseSingleAgentLeads, formatResponseFullAgents, filterByState, filterByText };