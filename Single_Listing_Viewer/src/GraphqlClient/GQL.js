import { gql } from "graphql-request";

export const LISTINGS_BY_SLOG = gql`
  query listingsBySlog($title: String!) {
    listings(where: {title: $title}) {
      nodes {
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


