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
          phone
        otherPhones
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

export const GET_USER_LEADS_FOR_WIZARD = gql`
  query dataAgentLeadsForWizard($agentId: Int!, $agentType: MasterEnum!) {
    dataAgent(agentId: $agentId, agentType: $agentType) {
      statuses {
        userLead {
          email
          lastName
          firstName
          id
          phone
          otherPhones
          otherEmail
        }
      }
    }
  }
`

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

export const GET_INFO_LEAD_BY_AGENT = gql`
query historyCommentLead($agentId: Int = 10, $userLeadId: Int = 10) {
  historyCommentLead(agentId: $agentId, userLeadId: $userLeadId) {
    id
    firstName
    phone
    otherPhones
    lastName
    email
    otherEmail
    commentService
    commentListing
    currentStatus {
      name
      statusId
    }
    statuses {
      comments
      date
      status
    }
  }
}
`