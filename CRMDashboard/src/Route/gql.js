import { gql } from "graphql-request";

export const GET_USER_BY_ID_GQL = gql`
  query user($id: ID!) {
    user(id: $id) {
      databaseId
      email
      avatar {
        url
      }
      firstName
      lastName
      name
      username
      id
      roles {
        nodes {
          displayName
          id
          name
        }
      }
    }
  }
`;
