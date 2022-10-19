import { useQuery } from "@tanstack/react-query";

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

// https://react-query.tanstack.com/reference/useQuery
const useQueryHelper = (props) => {
  const { name, gql, variables, config = {} } = props;
  let requestHeaders = {
/*     'Access-Control-Allow-Origin': 'http://localhost:3000'
 */  };
  const client = new GraphQLClient(API_URL);
  return useQuery(
    [name],
    async ({ signal }) => {
      const data = await client.request({ document: gql, variables, requestHeaders, signal });
      return data;
    },
    {
      ...globalConfig,
      ...config,
    }
  );
};

export { useQueryHelper };
