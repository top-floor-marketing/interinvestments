import { gql } from "graphql-request";

export const LOGIN_WITH_JWT = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      authToken
      refreshToken
      user {
        id
        username
        avatar {
          url
        }
        email
        databaseId
        firstName
        jwtAuthExpiration
        jwtRefreshToken
        roles {
          nodes {
            displayName
            id
          }
        }
      }
    }
  }
`;

export const GET_USER_BY_ID = gql`
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

export const GET_NEW_TOKEN =  gql`
mutation refreshJwtAuthToken($input: RefreshJwtAuthTokenInput!) {
  refreshJwtAuthToken(input: $input) {
    authToken
  }
}
`;