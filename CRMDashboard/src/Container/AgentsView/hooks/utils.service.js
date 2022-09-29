import orderBy from 'lodash/orderBy';

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
    // `${DOMAIN_URL}/agent?${URL_QUERY_ID_NAME}=${props.id}&shared=true`
    return `${DOMAIN_URL}/agent?${URL_QUERY_ID_NAME}=${id}&shared=true`;
}

export {
    orderAgentByName,
    urlShareAgent
}