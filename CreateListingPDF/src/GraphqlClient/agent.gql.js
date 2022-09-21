import { gql } from "graphql-request";

export const AGENT_ROLES = {
    ADMIN: 'MASTER',
    AGENT: 'AGENT',
}

export const GET_AGENT_PROFILE_INFO = gql`
  query GetAgentInfo($agentId: Int = 10, $agentType: MasterEnum) {
    dataAgent(agentType: $agentType, agentId: $agentId) {
      id
      databaseId
      email
      firstName
      lastName
      phone
      position
      roles
      content
      facebook
      instagram
      twitter
      linkedin
      avatarProfile
    }
  }
`;