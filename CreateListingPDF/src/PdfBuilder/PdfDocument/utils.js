import get from 'lodash/get';
import toLower from 'lodash/toLower';

const numFormatter = (num) => {
    const temp = parseInt(num);
    if (temp > 999 && temp < 1000000) {
        // convert to K for number from > 1000 < 1 million 
        return `${parseInt((temp / 1000).toFixed(1))}K`;
    } else if (temp > 1000000) {
        // convert to M for number from > 1 million 
        return `${parseInt((temp / 1000000).toFixed(1))}M`;
    } else if (temp < 900) {
        // if value < 1000, nothing to do
        return temp
    }
}

const removeHttp = (url) => {
    if (url.startsWith('https://')) {
    const https = 'https://';
    return url.slice(https.length);
  }

  if (url.startsWith('http://')) {
    const http = 'http://';
    return url.slice(http.length);
  }
  return url;
}

const addParamsToUrl = (url, agent) => {
    const URL_SHARED_FLAG = 'shared';
    const URL_QUERY_ID_NAME = 'agent-id';
    const USER_ROLES = {
        ADMIN: "administrator",
        AGENT: 'listing agent',
    }
    const idAgent = parseInt(get(agent, ["databaseId"], null));
    const rol = toLower(get(agent, ["roles"], USER_ROLES.ADMIN));
    return (!idAgent || rol === USER_ROLES.ADMIN) 
    ? url
    : `${url}?${URL_QUERY_ID_NAME}=${idAgent}&${URL_SHARED_FLAG}=true`;
}

const FONT_FAMILY = 'Outfit';
const INTERINVESTMENT = 'Interinvestments';
const DOMAIN_PROD = process.env.REACT_APP_DOMAIN_PROD;

export {
    numFormatter,
    removeHttp,
    addParamsToUrl,
    FONT_FAMILY,
    INTERINVESTMENT,
    DOMAIN_PROD
}