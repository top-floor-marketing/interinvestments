import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import filter from 'lodash/filter';
import toLower from 'lodash/toLower';
import includes from 'lodash/includes';
import forEach from 'lodash/forEach';
import findIndex from 'lodash/findIndex';
import orderBy from 'lodash/orderBy';
import uniqueId from 'lodash/uniqueId';

const formatReponseSingleAgentLeads = (response) => {
  if (!response || isEmpty(response)) return [];
  const leadsList = get(response, ['dataAgent', '0', 'statuses'], []);
  if (isEmpty(leadsList)) return [];
  const agentId = get(response, ['dataAgent', '0', 'databaseId'], []);
  const _fullData = leadsList.reduce((acc, val) => {
    if (
      toLower(get(val, ['userLead', 'firstName'], null)) === 'firstname' ||
      toLower(get(val, ['userLead', 'lastName'], null)) === 'lastname'
    )
      return acc;
    acc.push({ ...val, agentId });
    return acc;
  }, []);
  return _fullData;
};

const formatResponseFullAgents = (response, adminId) => {
  if (!response || isEmpty(response)) return [];
  const leadsList = get(response, ['dataAgent'], []);
  if (isEmpty(leadsList)) return [];
  const fullData = [];

  forEach(leadsList, (valUserLead) => {
    if (!isEmpty(get(valUserLead, ['statuses'], []))) {
      if (
        toLower(
          get(
            get(valUserLead, ['statuses', '0', 'userLead'], null),
            ['firstName'],
            null
          )
        ) === 'firstname' ||
        toLower(
          get(
            get(valUserLead, ['statuses', '0', 'userLead'], null),
            ['lastName'],
            null
          )
        ) === 'lastname'
      ) {
        return;
      }

      let newLead = {
        userLead: get(valUserLead, ['statuses', '0', 'userLead'], {}),
        allAgentsStatus: [],
      };

      let isOfficeLead = false;

      forEach(get(valUserLead, ['statuses'], []), (valStatusLead) => {
        newLead.allAgentsStatus.push({
          currentStatus: get(valStatusLead, ['currentStatus'], {}),
          agentId: get(valStatusLead, ['agent', 'databaseId'], null),
          ...get(valStatusLead, ['agent'], {}),
        });

        isOfficeLead =
          get(valStatusLead, ['agent', 'databaseId'], 0) === adminId;
      });

      // remove duplicates
      const unicos = [];
      const mapa = {};

      newLead.allAgentsStatus.forEach((obj) => {
        if (!mapa[obj.id]) {
          unicos.push(obj);
          mapa[obj.id] = obj;
        }
      });
      newLead.allAgentsStatus = unicos;
      fullData.push({ ...newLead, isOfficeLead });
    }
  });

  const order_ = orderBy(fullData, ['isOfficeLead'], ['desc']);
  return order_;
};

const filterByState = (value, data, statusUserLead, isAdminLeadView) => {
  if (!value) return data;
  const getState = get(
    filter(statusUserLead, (val) => val?.value === value),
    ['0'],
    null
  );
  if (isAdminLeadView)
    return filter(
      data,
      (val) =>
        findIndex(val?.allAgentsStatus, (valAgents) => {
          return toLower(valAgents?.currentStatus) === toLower(getState?.label);
        }) > -1
    );
  else
    return filter(
      data,
      (val) => toLower(val?.currentStatus) === toLower(getState?.label)
    );
};

const filterByText = (value, data) => {
  if (!value) return data;
  const getData = filter(
    data,
    (val) =>
      includes(toLower(val.userLead?.firstName), toLower(value)) ||
      includes(toLower(val.userLead?.lastName), toLower(value)) ||
      includes(toLower(val.userLead?.email), toLower(value))
  );
  return getData;
};

export {
  formatReponseSingleAgentLeads,
  formatResponseFullAgents,
  filterByState,
  filterByText,
};
