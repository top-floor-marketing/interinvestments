import { useQuery, useMutation } from '@tanstack/react-query'

import { GraphQLClient } from "graphql-request";

import { LOCAL_STORAGE } from "../Utils/globalConstants";

import isNull from "lodash/isNull";

const ENVIROMENT = process.env.REACT_APP_NODE_ENV;
const API_URL =
  ENVIROMENT === "production"
    ? process.env.REACT_APP_API_URL_PROD
    : process.env.REACT_APP_API_URL_DEV;

const globalConfig = {
  refetchOnWindowFocus: false,
  retry: false,
};

const useQueryHelper = (props) => {
  const { name, gql, variables, config = {} } = props;
  const token = JSON.parse(localStorage.getItem(LOCAL_STORAGE.TOKEN));
  const requestHeaders = {
    authorization: !isNull(token) ? `Bearer ${token}` : "",
  };
  const client = new GraphQLClient(API_URL);
  return useQuery(
    [name],
    async ({ signal }) => {
      return await client.request({ document: gql, variables, requestHeaders, signal });   
    },
    {
      ...globalConfig,
      ...config,
    }
  );
};

const useMutationHelper = (props) => {
  const { name, gql, config = {} } = props;
  const token = JSON.parse(localStorage.getItem(LOCAL_STORAGE.TOKEN));
  const requestHeaders = {
    authorization: !isNull(token) ? `Bearer ${token}` : "",
  };
  const client = new GraphQLClient(API_URL);
  return useMutation(
    [name],
    async ({ signal, variables }) => {
      return await client.request({ document: gql, variables, requestHeaders, signal });
    },
    {
      ...globalConfig,
      ...config,
    }
  );
};

export { useQueryHelper, useMutationHelper };
