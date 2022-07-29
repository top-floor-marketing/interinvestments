import { gql } from "graphql-request";

export const LISTINGS_BY_SLOG = gql`
  query listingsBySlog($title: String!) {
    listings(where: {title: $title}, first: 1) {
      nodes {
        uri
        databaseId
        address {
          address {
            city
            addressLine1
            address2
            state
            zip
          }
        }
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
          }
        }
        listingCategories {
          nodes {
            slug
          }
        }
        floorplans {
          floorplans {
            photos {
              altText
              fileSize
              sourceUrl
            }
            fieldGroupName
            den
            floorplanAcSqft
            floorplanNBaths
            floorplanNBeds
            floorplanNHbaths
            floorplanTotalSqft
            name
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