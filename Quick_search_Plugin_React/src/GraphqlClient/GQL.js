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

export const ALL_LISTING = gql`
  query listings($categoryId: Int!, $search: String!) {
    listings(first: 10, where: {categoryId: $categoryId, search: $search}) {
      nodes {
        databaseId
        title
        listingData {
          newDevelopment {
            photos {
              fileSize
              sourceUrl
              altText
            }
            description
            priceMin
            priceMax
            status
            nameOfDevelopment
          }
        }
      }
    }
  }
`