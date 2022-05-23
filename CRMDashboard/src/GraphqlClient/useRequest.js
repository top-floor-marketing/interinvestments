import { useQuery, useMutation } from "react-query";

import { GraphQLClient } from "graphql-request";

import { LOCAL_STORAGE } from "../Utils/globalConstants";

const ENVIROMENT = process.env.REACT_APP_NODE_ENV;
const API_URL =
  ENVIROMENT === "production"
    ? process.env.REACT_APP_API_URL_PROD
    : process.env.REACT_APP_API_URL_DEV;

const globalConfig = {
  refetchOnWindowFocus: false,
  retry: false,
};

const graphQLClient = new GraphQLClient(API_URL, {
  headers: {
    Authorization: `Bearer `,
  },
});

const useQueryHelper = (props) => {
  const { name, gql, variables, config = {} } = props;
  const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
  graphQLClient.setHeader("Authorization", `Bearer ${token}`);
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
  const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
  graphQLClient.setHeader("Authorization", `Bearer ${token}`);
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
