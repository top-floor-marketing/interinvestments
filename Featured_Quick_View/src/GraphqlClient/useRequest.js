import { useQuery, useMutation } from "react-query";

import { GraphQLClient } from "graphql-request";

const ENVIROMENT = process.env.REACT_APP_NODE_ENV;
const API_URL =
  ENVIROMENT === "production"
    ? process.env.REACT_APP_NODE_ENV
    : process.env.REACT_APP_API_URL_PROD;

const graphQLClient = new GraphQLClient(API_URL, {
  headers: {
    Authorization: `Bearer `,
  },
});

const useQueryHelper = (props) => {
  const { name, gql, variables, config } = props;
  return useQuery(name, async () => {
    return await graphQLClient.request(gql, variables);
  });
};

const useMutationHelper = (props) => {
  const { name, gql, variables, config } = props;
  return useMutation(name, async () => {
    return await graphQLClient.request(gql, variables);
  });
};

export { useQueryHelper, useMutationHelper };
