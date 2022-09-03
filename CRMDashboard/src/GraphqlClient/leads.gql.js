import { gql } from "graphql-request";

export const GET_LEADS_LIST_FOR_AGENT = gql`
  query dataAgentLeads($agentId: Int = 10, $agentType: MasterEnum) {
    dataAgent(agentId: $agentId, agentType: $agentType) {
      firstName
      lastName
      email
      status {
        status
        commentService
        commentListing
        userLead {
          id
          firstName
          lastName
          email
        }
      }
    }
  }
`;