import { useQuery, useMutation } from '@tanstack/react-query'

import { GraphQLClient } from "graphql-request";
import { GET_NEW_TOKEN } from './user.gql';
import { ROUTES_NAMES } from '../Route/routes';

import { LOCAL_STORAGE } from "../Utils/globalConstants";

import isNull from "lodash/isNull";
import get from 'lodash/get';
import { isEmpty } from 'lodash';

const ENVIROMENT = process.env.REACT_APP_NODE_ENV;
const API_URL =
  ENVIROMENT === "production"
    ? process.env.REACT_APP_API_URL_PROD
    : process.env.REACT_APP_API_URL_DEV;

const globalConfig = {
  refetchOnWindowFocus: false,
  retry: false,
  retryOnMount: false
};

const emptyLocalStorage = () => {
  localStorage.setItem(LOCAL_STORAGE.TOKEN, null);
  localStorage.setItem(LOCAL_STORAGE.REFRESH, null);
  localStorage.setItem(LOCAL_STORAGE.LEAD_DETAIL_ID, null);
  localStorage.setItem(LOCAL_STORAGE.ROUTE, ROUTES_NAMES.AUTH);
  localStorage.setItem(LOCAL_STORAGE.USER, null);
  window.location.reload();
}

const requestNewToken = async () => {
  const client = new GraphQLClient(API_URL);
  const refreshToken = JSON.parse(localStorage.getItem(LOCAL_STORAGE.REFRESH));
  const variables = {
    input: {
      jwtRefreshToken: refreshToken
    }
  }
  const response = await client.request({ document: GET_NEW_TOKEN, variables });
  const newToken = get(response, ["refreshJwtAuthToken", "authToken"], null);
  if (newToken) {
    localStorage.setItem(LOCAL_STORAGE.TOKEN, `"${newToken}"`);
  } else {
    emptyLocalStorage();
  }
  return newToken;
}

const useQueryHelper = (props) => {
  const { name, gql, variables, config = {} } = props;
  let token = JSON.parse(localStorage.getItem(LOCAL_STORAGE.TOKEN));
  let requestHeaders = {
    authorization: !isNull(token) ? `Bearer ${token}` : "",
  };
  const client = new GraphQLClient(API_URL);
  return useQuery(
    [name],
    async ({ signal }) => {
      let isErrorResponse = false;
      let tryRequest = false;
      try {
        return await client.request({ document: gql, variables, requestHeaders, signal });
      } catch (error) {
        console.log(`query = ${name}`, error);
        const errorParse = JSON.parse(JSON.stringify(error, undefined, 2));
        console.log("error ", error)
        console.log("errorParse ", errorParse)
        isErrorResponse = get(errorParse, ["response", "errors", "0", "debugMessage"], null);
      }
      if(isEmpty(isErrorResponse)) {
        throw('error => ');
      }
      if (isErrorResponse?.includes('invalid-jwt')) {
        try {
          const refreshResponse = await requestNewToken();
          if (refreshResponse) {
            tryRequest = true;
          }
        } catch (e) {
          console.log('e refresh = ', e);
        }
      }
      if (tryRequest) {
        try {
          token = JSON.parse(localStorage.getItem(LOCAL_STORAGE.TOKEN));
          requestHeaders = {
            authorization: !isNull(token) ? `Bearer ${token}` : "",
          };
          return await client.request({ document: gql, variables, requestHeaders, signal });
        } catch(e) {
          emptyLocalStorage()
        }
      }
      throw('not response');
    },
    {
      ...globalConfig,
      ...config,
    }
  );
};

const useMutationHelper = (props) => {
  const { name, gql, config = {} } = props;
  let token = JSON.parse(localStorage.getItem(LOCAL_STORAGE.TOKEN));
  let requestHeaders = {
    authorization: !isNull(token) ? `Bearer ${token}` : "",
  };
  const client = new GraphQLClient(API_URL);
  return useMutation(
    [name],
    async ({ signal, variables }) => {
      let isErrorResponse = false;
      let tryRequest = false;
      try {
        return await client.request({
          document: gql,
          variables,
          requestHeaders,
          signal,
        });
      } catch (error) {
        console.log('e mutation = ', error);
        const errorParse = JSON.parse(JSON.stringify(error, undefined, 2));
        isErrorResponse = get(errorParse, ["response", "errors", "0", "debugMessage"], null);
      }
      if (isErrorResponse.includes('invalid-jwt')) {
        try {
          const refreshResponse = await requestNewToken();
          if (refreshResponse) {
            tryRequest = true;
          }
        } catch (e) {
          console.log('e refresh mutation = ', e);
        }
      }
      if (tryRequest) {
        try {
          token = JSON.parse(localStorage.getItem(LOCAL_STORAGE.TOKEN));
          requestHeaders = {
            authorization: !isNull(token) ? `Bearer ${token}` : "",
          };
          return await client.request({
            document: gql,
            variables,
            requestHeaders,
            signal,
          });
        } catch(e) {
          emptyLocalStorage()
        }
      }
    },
    {
      ...globalConfig,
      ...config,
    }
  );
};

export { useQueryHelper, useMutationHelper };
