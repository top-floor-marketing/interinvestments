import { gql } from "graphql-request";

export const GET_LEADS_SERVICES = gql`
  query servicesTypes {
    servicesTypes {
      nodes {
        name,
        databaseId
      }
    }
  }
`