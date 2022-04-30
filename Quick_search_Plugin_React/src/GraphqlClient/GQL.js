import { gql } from 'graphql-request';

export const LISTINGS_CATEGORY = gql`
    query listingsCategory($first: Int) {
      categories(first: $first) {
        nodes {
            databaseId
            name
        }
      } 
    }
`