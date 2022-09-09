import { gql } from "graphql-request";

export const GET_LEADS_LIST_FOR_AGENT = gql`
  query dataAgentLeads($agentId: Int = 10, $agentType: MasterEnum) {
    dataAgent(agentId: $agentId, agentType: $agentType) {
      firstName
      lastName
      email
      id
      databaseId
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

export const COMMENTS_USER_LEAD = gql`
  mutation commentsUserLead(
    $agentId: Int!
    $comments: String!
    $statusId: Int!
    $userLeadId: Int!
  ) {
    commentsUserLead(
      input: {
        agentId: $agentId
        statusId: $statusId
        userLeadId: $userLeadId
        comments: $comments
      }
    ) {
      leadId
    }
  }
`

export const MUTATION_LEADS_ADD = gql`
  mutation leadListingMutation($input: LeadListingMutationInput!) {
    leadListingMutation(input: $input) {
      clientMutationId
      leadId
    }
  }
`