import { gql } from "graphql-request";

export const GET_LISTING_FOR_PDF = gql`
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
          description
          photos {
            altText
            description
            sourceUrl
            title
          }
          finishes {
            appliances
            bathrooms
            fieldGroupName
            flooring
            kitchenCabinets
          }
          specs {
            bath
            bedrooms
            fieldGroupName
            sqft
          }
          estimatedDateOfCompletion
          totalUnits
          livingArea
          views
          priceMin
          priceMax
          nameOfDevelopment
          status
        }
      }
      floorplans {
        allFloorplans {
          floorplans {
            acSqft
            bedbath
            den
            name
            totalSqft
            pdf {
              altText
              title
              mediaItemUrl
            }
          }
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
`