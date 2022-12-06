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
  query neightborhoodslistings {
    neighborhoods(first: 100) {
      nodes {
        id
        name
        contentNodes {
          nodes {
            ... on Listing {
              listingCategories {
                nodes {
                  name
                }
              }
            }
          }
        }
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
            search: $search,
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
                latitude
					      longitude
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

export const GET_SINGLE_LISTING_GQL = gql`
  query listings($id: Int!) {
    listings(first: 1, where: { id: $id }) {
      nodes {
        databaseId
        uri
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
            contentLivingArea {
              livingArea
              priceMax
              priceMin
            }
            views
            priceMin
            priceMax
            nameOfDevelopment
          }
        }
        title
        neighborhoods {
          nodes {
            description
            databaseId
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
            uri
          }
        }
      }
    }
  }
`;