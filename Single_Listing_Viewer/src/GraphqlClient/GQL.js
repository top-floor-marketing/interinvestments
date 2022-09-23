import { gql } from "graphql-request";

export const LISTINGS_BY_SLOG = gql`
    query listingsBySlog($title: String!) {
      listings(where: {title: $title}, first: 1) {
        nodes {
          uri
          featuredImage {
            node{
              altText
              sourceUrl
            }
          }
          databaseId
          title
          slug
          neighborhoods {
            nodes {
              databaseId
              name
            }
          }
          team {
            team {
              arquitect
              fieldGroupName
              interiorDesigner
              landscapeArchitect
              paymentStructure
            }
          }
          listingData {
            newDevelopment {
              status
              latitude
              longitude
              totalUnits
              estimatedDateOfCompletion
              description
              video {
                altText
                mediaItemUrl
                title
              }
              photos {
                fileSize
                sourceUrl
                altText
              }
              priceMax
              priceMin
              specs {
                bath
                bedrooms
                fieldGroupName
                sqft
              }
              finishes {
                appliances
                bathrooms
                fieldGroupName
                flooring
                kitchenCabinets
              }
            }
          }
          listingCategories {
            nodes {
              slug
            }
          }
          floorplans {
            floorplans {
              allPdf {
                title
                itemPdf {
                  pdf {
                    title
                    mediaItemUrl
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