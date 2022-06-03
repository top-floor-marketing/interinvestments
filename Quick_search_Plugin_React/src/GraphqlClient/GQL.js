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
export const ALL_NEIGHBORHOODS = gql`
  query neighborhoods {
    neighborhoods {
      nodes{
          slug
          databaseId
          title
      }
    }
  }
`

export const ALL_LISTING = gql`
  query listings(
    $categoryIn: [ID], 
    $search: String , 
    $slug: [String] 
  ) {
    listings(
      where: {
        categoryIn: $categoryIn, 
        search: $search
      }, 
      first: 10
    ){
      nodes {
        neighborhoods(where: {slug: $slug}) {
          nodes {
            slug
            databaseId
            title
          }
        }
        categories {
          nodes {
            databaseId
            name
          }
        }
        uri
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