import { gql } from "graphql-request";


export const LISTINGS_CATEGORY = gql`
  query listingsCategory($first: Int) {
    listingCategories(first: $first) {
      nodes {
        name
        databaseId
      }
    }
}`

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
export const ACF_OPTIONS_GlOBAL_OPTIONS = gql`
  query acfOptionsGlobalOptions {
    acfOptionsGlobalOptions {
      optionPage {
        mapApiKey
      }
    }
  }
`

export const ALL_LISTINGS_DEVELOPMENTS = (Category = null, neighborhood = null) => {
  return (gql`
      query listings(
        ${(neighborhood) ? '$NEIGHBORHOOD: [String],' : ''} 
        ${(Category) ? '$LISTINGCATEGORY: [String],' : ''}
        $search: String,
        $perPage: Int,
        $after: String
      ) {
        listings(
          where: {
            taxQuery: {
              taxArray: [
                ${(neighborhood) ? ' {operator: IN, terms: $NEIGHBORHOOD, taxonomy: NEIGHBORHOOD},' : ''} 
                ${(Category) ? '{operator: IN, terms: $LISTINGCATEGORY, taxonomy: LISTINGCATEGORY}' : ''}
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
  )
} 