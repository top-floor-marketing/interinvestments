import { gql } from "graphql-request";

const LEAD_LISTING_MUTATION = gql`
  mutation leadListingMutation($input: LeadListingMutationInput!) {
    leadListingMutation(input: $input) {
      leadId
      clientMutationId
    }
  }
`

const LISTINGS_BY_SLOG_FORM = gql`
  query listingsBySlogForm($title: String!) {
    listings(where: {title: $title}) {
      nodes {
        slug
        title
        databaseId
      }
    }
  }
`



export { LEAD_LISTING_MUTATION, LISTINGS_BY_SLOG_FORM }