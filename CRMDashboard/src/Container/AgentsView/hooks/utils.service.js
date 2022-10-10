import orderBy from 'lodash/orderBy';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import toLower from 'lodash/toLower';

const URL_QUERY_ID_NAME = "agent-id";

const ENVIROMENT = process.env.REACT_APP_NODE_ENV;
const DOMAIN_URL =
  ENVIROMENT === "production"
    ? process.env.REACT_APP_DOMAIN_PROD
    : process.env.REACT_APP_DOMAIN_DEV;

const orderAgentByName = (data) => {
    return orderBy(data, ['firstName'], ['asc']);
}

const urlShareAgent = (id) => {
    return `${DOMAIN_URL}/agent?${URL_QUERY_ID_NAME}=${id}&shared=true`;
}

const filterByText = (value, data) => {
    if (!value) return data;
    const getData = filter(data, (val) =>
      includes(toLower(val?.firstName), toLower(value))
      ||
      includes(toLower(val?.lastName), toLower(value))
      ||
      includes(toLower(val?.phone), toLower(value))
      ||
      includes(toLower(val?.email), toLower(value))
    )
    return getData;
  }

export {
    orderAgentByName,
    urlShareAgent,
    filterByText
}