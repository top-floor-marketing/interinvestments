import { useQuery, useMutation } from '@tanstack/react-query';

import { GraphQLClient } from 'graphql-request';
import { GET_NEW_TOKEN } from './user.gql';
import { ROUTES_NAMES } from '../Route/routes';

import { LOCAL_STORAGE } from '../Utils/globalConstants';

import isNull from 'lodash/isNull';
import get from 'lodash/get';
import { isEmpty } from 'lodash';

const ENVIROMENT = process.env.REACT_APP_NODE_ENV;
const API_URL =
  ENVIROMENT === 'production'
    ? process.env.REACT_APP_API_URL_PROD
    : process.env.REACT_APP_API_URL_DEV;

const globalConfig = {
  refetchOnWindowFocus: false,
  retry: false,
  retryOnMount: false,
  refetchOnReconnect: false
};

const emptyLocalStorage = () => {
  localStorage.setItem(LOCAL_STORAGE.TOKEN, null);
  localStorage.setItem(LOCAL_STORAGE.REFRESH, null);
  localStorage.setItem(LOCAL_STORAGE.LEAD_DETAIL_ID, null);
  localStorage.setItem(LOCAL_STORAGE.ROUTE, ROUTES_NAMES.AUTH);
  localStorage.setItem(LOCAL_STORAGE.USER, null);
  window.location.reload();
};

const requestNewToken = async () => {
  const client = new GraphQLClient(API_URL);
  const refreshToken = JSON.parse(localStorage.getItem(LOCAL_STORAGE.REFRESH));
  const variables = {
    input: {
      jwtRefreshToken: refreshToken,
    },
  };
  const response = await client.request({ document: GET_NEW_TOKEN, variables });
  const newToken = get(response, ['refreshJwtAuthToken', 'authToken'], null);
  if (newToken) {
    localStorage.setItem(LOCAL_STORAGE.TOKEN, `"${newToken}"`);
  } else {
    emptyLocalStorage();
  }
  return newToken;
};

const useQueryHelper = (props) => {
  const { name, gql, variables, config = {} } = props;
  let token = JSON.parse(localStorage.getItem(LOCAL_STORAGE.TOKEN));
  let requestHeaders = {
    authorization: !isNull(token) ? `Bearer ${token}` : '',
  };
  const client = new GraphQLClient(API_URL);
  return useQuery({
    queryKey: [name],
    queryFn: async ({ signal }) => {
      let isErrorResponse = false;
      try {
        return await client.request({
          document: gql,
          variables,
          requestHeaders,
          signal,
        });
      } catch (error) {
        const errorParse = JSON.parse(JSON.stringify(error, undefined, 2));
        isErrorResponse =
          get(errorParse, ['response', 'errors', '0', 'debugMessage'], null) ||
          get(errorParse, ['response', 'errors', '0', 'message'], null);
      }

      if (isEmpty(isErrorResponse)) {
        return Promise.reject(new Error('Oh no!'))
      }
      if (
        isErrorResponse?.includes('invalid-jwt') ||
        isErrorResponse?.includes('invalid-secret-key') ||
        isErrorResponse?.includes('token')
      ) {
        try {
          const refreshResponse = await requestNewToken();
          if (refreshResponse) {
            token = JSON.parse(localStorage.getItem(LOCAL_STORAGE.TOKEN));
            requestHeaders = {
              authorization: !isNull(token) ? `Bearer ${token}` : '',
            };
            return await client.request({
              document: gql,
              variables,
              requestHeaders,
              signal,
            });
          }
        } catch (e) {
          emptyLocalStorage();
        }
      }
      emptyLocalStorage();
      return Promise.reject(new Error('not response'))
    },
    ...globalConfig,
    ...config,
  });
};

const useMutationHelper = (props) => {
  const { name, gql, config = {} } = props;
  let token = JSON.parse(localStorage.getItem(LOCAL_STORAGE.TOKEN));
  let requestHeaders = {
    authorization: !isNull(token) ? `Bearer ${token}` : '',
  };
  const client = new GraphQLClient(API_URL);
  return useMutation({
    mutationKey: name,
    mutationFn: async ({ signal, variables }) => {
      let isErrorResponse = false;
      try {
        return await client.request({
          document: gql,
          variables,
          requestHeaders,
          signal,
        });
      } catch (error) {
        const errorParse = JSON.parse(JSON.stringify(error, undefined, 2));
        isErrorResponse = get(
          errorParse,
          ['response', 'errors', '0', 'debugMessage'],
          null
        );
      }
      if (
        isErrorResponse?.includes('invalid-jwt') ||
        isErrorResponse?.includes('invalid-secret-key') ||
        isErrorResponse?.includes('token')
      ) {
        try {
          const refreshResponse = await requestNewToken();
          if (refreshResponse) {
            token = JSON.parse(localStorage.getItem(LOCAL_STORAGE.TOKEN));
            requestHeaders = {
              authorization: !isNull(token) ? `Bearer ${token}` : '',
            };
            return await client.request({
              document: gql,
              variables,
              requestHeaders,
              signal,
            });
          }
        } catch (e) {
          emptyLocalStorage();
        }
      }
      emptyLocalStorage();
      throw new Error('not response');
    },
    ...globalConfig,
    ...config,
  });
};

export { useQueryHelper, useMutationHelper };
