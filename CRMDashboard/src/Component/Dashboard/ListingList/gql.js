import { gql } from "graphql-request";

export const GET_ALL_LISTINGS = gql`
  query listings($perPage: Int!, $after: String) {
    listings(
      where: { orderby: { field: TITLE, order: ASC } }
      first: $perPage
      after: $after
    ) {
      nodes {
        databaseId
        title
        status
        listingData {
          newDevelopment {
            description
            priceMin
            priceMax
            status
            photos {
              altText
              databaseId
              mimeType
              sourceUrl
              uri
              status
            }
            nameOfDevelopment
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
