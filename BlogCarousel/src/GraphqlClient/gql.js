import { gql } from "graphql-request";

export const GET_POST_BLOG_GQL = gql`
  query posts($first: Int!) {
    posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        databaseId
        slug
        id
        uri
        featuredImage {
          node {
            altText
            fileSize
            mediaType
            sourceUrl
          }
        }
        title
        excerpt
      }
    }
  }
`;
