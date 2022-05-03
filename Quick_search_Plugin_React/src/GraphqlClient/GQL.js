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
  query listings($categoryId: Int!, $title: String!) {
    listings(first: 10, where: {categoryId: $categoryId, title: $title}) {
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