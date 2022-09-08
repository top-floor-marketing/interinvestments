import { gql } from "graphql-request";

export const PIPELINE = gql`
    query pipeline($agentId: Int!, $statusId: Int!) {
        pipeline(agentId: $agentId, statusId: $statusId) {
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