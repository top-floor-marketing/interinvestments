import { gql } from "graphql-request";

export const GET_STATUS_USER_LEADS = gql`
  query statuses {
    statuses {
      nodes {
        name
        databaseId
      }
    }
  }
`;
