import { gql } from "graphql-request";

export const PIPELINE = gql`
    query pipeline($agentId: Int!, $statusId: Int!) {
        pipeline(agentId: $agentId, statusId: $statusId) {
            id
            firstName
            lastName
            email
            date
            comments
            currentStatus {
                statusId
                name
            }
        }
    }
`

export const ALL_LEADS_PIPELINE = gql`
query allLeadsPipeline {
  dataAgent(agentType: LEAD) {
    id
    statuses {
      agent {
        email
        id
        avatarProfile
        databaseId
        firstName
        lastName
      }
      commentListing
      commentService
      currentStatus
      userLead {
        email
        firstName
        id
        lastName
        otherEmails
        otherPhones
        phone
      }
      status {
        date
      }
    }
  }
}
`