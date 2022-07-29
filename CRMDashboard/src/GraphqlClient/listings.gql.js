import { gql } from "graphql-request";


export const GET_LISTINGS_CATEGORY = gql`
  query listingsCategory($first: Int) {
    listingCategories(first: $first) {
      nodes {
        name
        databaseId
      }
    }
}`

export const GET_ALL_NEIGHBORHOODS = gql`
  query neighborhoods {
    neighborhoods {
      nodes{
        name
        databaseId
    }
  }
  }
`
export const GET_ACF_OPTIONS_GlOBAL_OPTIONS = gql`
  query acfOptionsGlobalOptions {
    acfOptionsGlobalOptions {
      optionPage {
        mapApiKey
      }
    }
  }
`

export const GET_ALL_LISTINGS = (category = null, neighborhood = null) => {

    let taxArray = '';

    if (neighborhood || category) {
        taxArray = 'taxQuery: { taxArray: [';
        taxArray = (neighborhood) ? `${taxArray} {operator: IN, terms: $NEIGHBORHOOD, taxonomy: NEIGHBORHOOD},` : taxArray;
        taxArray = (category) ? `${taxArray} {operator: IN, terms: $LISTINGCATEGORY, taxonomy: LISTINGCATEGORY}` : taxArray;
        taxArray = `${taxArray} ]},`;
    }

    return gql`
      query listings(
        ${(neighborhood) ? '$NEIGHBORHOOD: [String],' : ''} 
        ${(category) ? '$LISTINGCATEGORY: [String],' : ''}
        $search: String,
        $perPage: Int,
        $after: String
      ) {
        listings(
          where: {
            ${taxArray}
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
                livingArea
                views
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
            livingArea
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