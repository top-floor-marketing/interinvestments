import { gql } from 'graphql-request';

export const LISTINGS_CATEGORY = gql`
  query listingsCategory($first: Int) {
    listingCategories(first: $first) {
      nodes {
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
        name
        databaseId
    }
  }
  }
`

export const ALL_LISTING = gql`
  query listings(
    $NEIGHBORHOOD: [String], 
    $LISTINGCATEGORY: [String] ,
    $search: String,
  ) {
    listings(
      where: {
        taxQuery: {
          taxArray: [
            {operator: IN, terms: $NEIGHBORHOOD, taxonomy: NEIGHBORHOOD}, 
            {operator: IN, terms: $LISTINGCATEGORY, taxonomy: LISTINGCATEGORY}
          ]},
        search: $search
      }
      first: 5
    ) {
      nodes {
        databaseId
        title
        uri
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
        listingCategories {
          nodes {
            name
            termTaxonomyId
          }
        }
        neighborhoods {
          nodes {
            name
            termTaxonomyId
          }
        }
      }
    }
  }
`