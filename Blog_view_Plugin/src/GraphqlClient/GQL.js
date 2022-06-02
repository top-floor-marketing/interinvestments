import { gql } from "graphql-request";

export const POST_BY_ID = gql`
  query PostById($slug: String!) {
    postBy(slug: $slug) {
      status
      databaseId
      slug
      tags {
        nodes {
          databaseId
        }
      }
    }
  }
`
export const otherInterestingBlogs = gql`
  query otherInterestingBlogs($first: Int!, $tagIn: [ID]) {
    posts(first: $first, where: {tagIn: $tagIn}) {
      nodes {
        uri
        date
        featuredImage {
          node {
            altText
            sourceUrl
            id
          }
        }
        title
        tags {
          nodes {
            name
            databaseId
          }
        }
        categories {
          nodes {
            name
          }
        }
        slug
        databaseId
      }
    }
  }
`


