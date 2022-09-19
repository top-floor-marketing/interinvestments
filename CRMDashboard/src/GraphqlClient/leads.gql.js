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

export const SET_NEW_COMMENT_LEAD = gql`
  mutation commentsUserLead($input: CommentsUserLeadInput!) {
    commentsUserLead(input: $input) {
      leadId
    }
  }
`;

export const GET_LEAD_INTERESTED = gql`
  query LeadsforLead($agentId: Int = 10, $leadByAgentId: Int = 10) {
    dataAgent(
      agentType: LEAD
      agentId: $agentId
      leadByAgentId: $leadByAgentId
    ) {
      leads {
        nodes {
          title
          leads {
            relationshipWithListing {
              ... on Listing {
                listingId
                title
                databaseId
                uri
                listingData {
                  newDevelopment {
                    photos {
                      altText
                      description
                      sourceUrl
                      title
                    }
                    contentLivingArea {
                      livingArea
                      priceMax
                      priceMin
                    }
                    livingArea
                    views
                  }
                }
                title
                neighborhoods {
                  nodes {
                    description
                    databaseId
                    name
                  }
                }
                featuredImage {
                  node {
                    sourceUrl
                    uri
                  }
                }
              }
            }
            relationshipService {
              ... on IRService {
                title
                date
              }
            }
          }
        }
      }
    }
  }
`;