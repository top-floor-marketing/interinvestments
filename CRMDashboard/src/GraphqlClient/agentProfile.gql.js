import { gql } from "graphql-request";

export const GET_AGENT_PROFILE_INFO = gql`
query GetAgentInfo($agentId: Int = 10, $agentType: MasterEnum) {
    dataAgent(
        agentType: $agentType, agenId: $agentId
      ) {
        id
        databaseId
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
query GetAgentInfo($agentId: Int = 10, $agentType: MasterEnum) {
    dataAgent(
      agentType: $agentType, agenId: $agentId
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
          contentLivingArea {
            livingArea
            priceMax
            priceMin
          }
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
  $twitter: String,
  $avatarProfile: Upload
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
      twitter: $twitter,
      avatarProfile: $avatarProfile
    }
  ) {
    request_info
  }
}
`;

export const MUTATION_ADD_AGENT_LISTING =  gql`
mutation agentEditProfile(
  $id: Int!,
  $listings: [Int]
) {
  agentEditProfile(input: { id: $id, listings: $listings, action: EDIT} ) {
    request_info
  }
}
`;

export const MUTATION_DETELE_AGENT_LISTING = gql`
mutation agentEditProfile(
  $id: Int!,
  $listings: [Int]
) {
  agentEditProfile(input: { id: $id, listings: $listings, action: DELETE} ) {
    request_info
  }
}
`;