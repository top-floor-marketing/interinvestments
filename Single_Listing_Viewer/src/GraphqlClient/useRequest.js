import { useQuery, useMutation } from '@tanstack/react-query';

import { GraphQLClient } from "graphql-request";

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

const graphQLClient = new GraphQLClient(API_URL, {
});

const useQueryHelper = (props) => {
  const { name, gql, variables, config = {} } = props;
  return useQuery(
    [name],
    async () => {
      const data = await graphQLClient.request(gql, variables);
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
    async ({ variables }) => {
      return await graphQLClient.request(gql, variables);
    },
    {
      ...globalConfig,
      ...config,
    }
  );
};

export { useQueryHelper, useMutationHelper };
