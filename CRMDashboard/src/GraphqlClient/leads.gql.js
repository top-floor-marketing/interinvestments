import { gql } from "graphql-request";

export const GET_LEADS_LIST_FOR_AGENT = gql`
  query dataAgentLeads($agentId: Int = 10, $agentType: MasterEnum) {
    dataAgent(agentId: $agentId, agentType: $agentType) {
      firstName
      lastName
      email
      statuses {
        userLead {
          email
          lastName
          firstName
          id
        }
        commentService
        commentListing
        currentStatus
        status {
          status
          date
          comments
        }
      }
    }
  }
`;


export const MUTATION_LEADS_ADD = gql`
  mutation leadListingMutation($input: LeadListingMutationInput!) {
    leadListingMutation(input: $input) {
      clientMutationId
      leadId
    }
  }
`