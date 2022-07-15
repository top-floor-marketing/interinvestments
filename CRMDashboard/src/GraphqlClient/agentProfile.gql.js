import { gql } from "graphql-request";

export const GET_AGENT_INFO= gql`
query GetAgentInfo($agentId: Number) {
    dataAgent(
        agentType: "AGENT", agenId: $agentId
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