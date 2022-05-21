import { gql } from 'graphql-request';

export const INTER_INVESTMENTS_ADMIN_LOGIN = gql`
    mutation InterInvestmentsAdminLogin($input: LoginInput!) {
        login(input: $input) {
            authToken
            clientMutationId
            refreshToken
            user {
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
`