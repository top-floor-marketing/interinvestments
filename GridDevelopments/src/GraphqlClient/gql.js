import { gql } from "graphql-request";

export const GET_LISTING_FEATURED_GQL = gql`
  query listings($categoryId: Int!, $perPage: Int!, $after: String) {
    listings(
      where: { categoryId: $categoryId, orderby: { field: TITLE, order: ASC } }
      first: $perPage
      after: $after
    ) {
      nodes {
        address {
          address {
            address2
            addressLine1
            city
            fieldGroupName
            state
            zip
          }
        }
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

export const GET_CATEGORIES_GQL = gql`
  query listingCategories {
    listingCategories {
      nodes {
        databaseId
        description
        name
        slug
        id
      }
    }
  }
`;

export const GET_SINGLE_LISTING_GQL = gql`
  query listings($id: Int!) {
    listings(first: 1, where: { id: $id }) {
      nodes {
        databaseId
        address {
          address {
            address2
            addressLine1
            city
            zip
            state
          }
        }
        listingData {
          newDevelopment {
            description
            photos {
              altText
              description
              sourceUrl
              title
            }
            priceMax
            priceMin
            nameOfDevelopment
          }
        }
        title
      }
    }
  }
`;
