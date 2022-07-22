import { gql } from "graphql-request";

const AGENT_TYPE = 'AGENT';

export const GET_AGENT_PROFILE_INFO= gql`
query GetAgentInfo($agentId: Int = 10) {
    dataAgent(
        agentType: ${AGENT_TYPE}, agenId: $agentId
      ) {
        id
        email
        firstName
        lastName
        phone
        position
        avatar
        roles
        content
        facebook
        instagram
        twitter
        linkedin
        listing
    }
  }
`;