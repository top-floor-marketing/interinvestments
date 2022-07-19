import { gql } from "graphql-request";

const ALL_LISTINGS_DEVELOPMENTS = gql`
  query listings(
    $NEIGHBORHOOD: [String], 
    $LISTINGCATEGORY: [String] ,
    $search: String,
    $perPage: Int!, 
    $after: String
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
      first: $perPage
      after: $after
    ) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      nodes {
        databaseId
        date
        uri
        title
        featuredImage {
          node {
            sourceUrl
            uri
          }
        }
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
            description
            databaseId
            termTaxonomyId
          }
        }
      }
    }
  }
`



export { ALL_LISTINGS_DEVELOPMENTS }