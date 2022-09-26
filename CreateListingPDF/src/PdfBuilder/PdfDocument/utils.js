import get from 'lodash/get';
import toLower from 'lodash/toLower';
import {decode} from 'html-entities';

const numFormatter = (num) => {
    const temp = parseInt(num);
    if (temp > 999 && temp < 1000000) {
        // convert to K for number from > 1000 < 1 million 
        return `${parseInt((temp / 1000).toFixed(2))}K`;
    } else if (temp > 1000000) {
        // convert to M for number from > 1 million 
        return `${parseInt((temp / 1000000).toFixed(2))}M`;
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

const addParamsToUrl = (domainSite, agent, urlListing = '') => {
    const URL_SHARED_FLAG = 'shared';
    const URL_QUERY_ID_NAME = 'agent-id';
    const USER_ROLES = {
        ADMIN: "administrator",
        AGENT: 'listing agent',
    }
    const idAgent = parseInt(get(agent, ["databaseId"], null));
    const rol = toLower(get(agent, ["roles"], USER_ROLES.ADMIN));
    return (!idAgent || rol === USER_ROLES.ADMIN)
        ? `${domainSite}${urlListing}`
        : `${domainSite}${urlListing}?${URL_QUERY_ID_NAME}=${idAgent}&${URL_SHARED_FLAG}=true`;
}

const removeTags = (str) => {
    if ((str === null) || (str === ''))
        return false;
    else
        str = str.toString().slice(0, 800);

    // Regular expression to identify HTML tags in 
    // the input string. Replacing the identified 
    // HTML tag with a null string.
    return decode(str.replace(/(<([^>]+)>)/ig, ''));
}

const PADDING_FOR_PAGES = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: '#ecf0f1',
    paddingTop: '22px',
    paddingBottom: '22px',
    paddingRight: "2%",
    paddingLeft: "2%",
}
const FONT_FAMILY = 'Outfit';
const INTERINVESTMENT = 'Interinvestments';
const DOMAIN_PROD = process.env.REACT_APP_DOMAIN_PROD;

export {
    numFormatter,
    removeHttp,
    addParamsToUrl,
    removeTags,
    FONT_FAMILY,
    INTERINVESTMENT,
    DOMAIN_PROD,
    PADDING_FOR_PAGES
}