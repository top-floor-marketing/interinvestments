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
            priceMax
            priceMin
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


/* 
export const GET_LISTING_FEATURED_GQL = gql`
  query listings($categoryId: Int!, $perPage: Int!, $after: String) {
    listings(
      where: { categoryId: $categoryId, orderby: { field: TITLE, order: ASC } }
      first: $perPage
      after: $after
    ) {
      nodes {
        address {
          address {
            address2
            addressLine1
            city
            fieldGroupName
            state
            zip
          }
        }
        databaseId
        title
        status
        listingData {
          newDevelopment {
            description
            priceMin
            priceMax
            status
            photos {
              altText
              databaseId
              mimeType
              sourceUrl
              uri
              status
            }
            nameOfDevelopment
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const GET_CATEGORIES_GQL = gql`
  query listingCategories {
    listingCategories {
      nodes {
        databaseId
        description
        name
        slug
        id
      }
    }
  }
`; */
