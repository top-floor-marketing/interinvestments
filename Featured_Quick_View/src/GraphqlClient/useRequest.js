import { useQuery, useMutation } from "react-query";

import { GraphQLClient } from "graphql-request";

const ENVIROMENT = process.env.REACT_APP_NODE_ENV;
const API_URL =
  ENVIROMENT === "production"
    ? process.env.REACT_APP_NODE_ENV
    : process.env.REACT_APP_API_URL_PROD;

const globalConfig = {
  refetchOnWindowFocus: false,
};

const graphQLClient = new GraphQLClient(API_URL, {
  headers: {
    Authorization: `Bearer `,
  },
});

// https://react-query.tanstack.com/reference/useQuery
const useQueryHelper = (props) => {
  const { name, gql, variables, config = {} } = props;
  return useQuery(
    name,
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
  const { name, gql, variables, config = {} } = props;
  return useMutation(
    name,
    async () => {
      return await graphQLClient.request(gql, variables);
    },
    {
      ...globalConfig,
      ...config,
    }
  );
};

export { useQueryHelper, useMutationHelper };
