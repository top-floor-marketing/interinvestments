import { gql } from "graphql-request";

const TAG_NAME = 'Featured Developments'; //31

export const GET_TAG_FEATURED_DEVELOPMENTS = gql`
query getTag {
  tags(where: { nameLike: "${TAG_NAME}" } ) {
    nodes {
      databaseId
      name
    }
  }
}
`;

export const GET_LISTING_FEATURED_DEVELOPMENTS =  gql`
query getListings($tagId: String, $perPage: Int!, $after: String) {
  listings(
    where: { tagId: $tagId }, 
    first: $perPage
    after: $after) {
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
    nodes {
      databaseId
      date
      title
      uri
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
      listingData {
        newDevelopment {
          photos {
            altText
            databaseId
            mimeType
            sourceUrl
          }
        }
      }
    }
  }
}
`;

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