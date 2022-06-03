import { gql } from 'graphql-request';

export const LISTINGS_CATEGORY = gql`
   query listingsCategory($first: Int) {
    listingCategories(first: $first) {
      nodes {
        slug
        name
        databaseId
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
 query listings($slugneighborhoods: [String], $search: String, $slugCategories: [String]) {
  listings(where: {search: $search}, first: 10) {
    nodes {
      neighborhoods(where: {slug: $slugneighborhoods}) {
        nodes {
          slug
          databaseId
          title
        }
      }
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
      listingCategories(where: {slug: $slugCategories}) {
        nodes {
          name
          databaseId
        }
      }
    }
  }
}
`