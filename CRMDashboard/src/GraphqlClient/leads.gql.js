import { gql } from "graphql-request";

const ROLE_LEAD = 'LEAD';

export const GET_LEADS_LIST = gql`
query GetLeadList($perPage: Int!, $after: String) {
    users(
        where: {roleIn: ${ROLE_LEAD}}
        first: $perPage
        after: $after
      ) {
      nodes {
        description
        email
        databaseId
        firstName
        lastName
        name
        username
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;