import { gql } from "graphql-request";

const AGENT_TYPE = 'AGENT';

export const GET_AGENT_PROFILE_INFO= gql`
query GetAgentInfo($agentId: Int = 10) {
    dataAgent(
        agentType: ${AGENT_TYPE}, agenId: $agentId
      ) {
        id
        email
        firstName
        lastName
        phone
        position
        avatarProfile
        roles
        content
        facebook
        instagram
        twitter
        linkedin
    }
  }
`;

export const GET_AGENT_FEATURED_LISTING = gql`
query GetAgentInfo($agentId: Int = 10) {
    dataAgent(
        agentType: ${AGENT_TYPE}, agenId: $agentId
      ) {
        listings {
          nodes {
            title
            listingId
            databaseId
      date
      uri
      neighborhoods {
        nodes {
          description
          databaseId
          name
        }
      }
      listingData {
        newDevelopment {
          latitude
          longitude
          livingArea
          views
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
  }
`;

// Mutations


export const MUTATION_EDIT_AGENT_PROFILE = gql`
mutation agentEditProfile(
  $content: String,
  $email: String,
  $facebook: String,
  $firstName: String,
  $id: Int!,
  $instagram: String,
  $lastName: String,
  $linkedin: String,
  $phone: String,
  $position: String,
  $twitter: String
) {
  agentEditProfile(
    input: {
      content: $content, 
      email: $email, 
      facebook: $facebook, 
      firstName: $firstName, 
      id: $id, 
      instagram: $instagram, 
      lastName: $lastName, 
      linkedin: $linkedin, 
      phone: $phone, 
      position: $position, 
      twitter: $twitter
    }
  ) {
    request_info
  }
}
`;