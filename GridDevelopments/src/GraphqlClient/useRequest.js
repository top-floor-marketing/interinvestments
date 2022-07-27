import { useQuery, useMutation } from '@tanstack/react-query'

import { GraphQLClient } from "graphql-request";

const ENVIROMENT = process.env.REACT_APP_NODE_ENV;
const API_URL =
  ENVIROMENT === "production"
    ? process.env.REACT_APP_API_URL_PROD
    : process.env.REACT_APP_API_URL_DEV;

const globalConfig = {
  refetchOnWindowFocus: false,
  retry: false,
};

const client = new GraphQLClient(API_URL);

const useQueryHelper = (props) => {
  const { name, gql, variables, config = {} } = props;
  return useQuery(
    [name],
    async ({ signal }) => {
      const data = client.request({ document: gql, variables, signal });   
      return data;
    },
    {
      ...globalConfig,
      ...config,
    }
  );
};

const useMutationHelper = (props) => {
  const { name, gql, config = {} } = props;
  return useMutation(
    [name],
    async ({ signal, variables }) => {
      return await client.request({ document: gql, variables, signal });
    },
    {
      ...globalConfig,
      ...config,
    }
  );
};

export { useQueryHelper, useMutationHelper };
