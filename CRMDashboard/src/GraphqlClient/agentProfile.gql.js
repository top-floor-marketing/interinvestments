import { gql } from "graphql-request";

export const GET_AGENT_PROFILE_INFO = gql`
  query GetAgentInfo($agentId: Int = 10, $agentType: MasterEnum) {
    dataAgent(agentType: $agentType, agentId: $agentId) {
      id
      databaseId
      email
      firstName
      lastName
      phone
      position
      roles
      content
      facebook
      instagram
      twitter
      linkedin
      tiktok
      youtube
      rumble
      avatarProfile
    }
  }
`;

export const GET_AGENT_FEATURED_LISTING = gql`
query GetAgentInfo($agentId: Int = 10, $agentType: MasterEnum) {
    dataAgent(
      agentType: $agentType, agentId: $agentId
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

const TAG_NAME = 'Featured Developments';
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

export const GET_LISTING_FEATURED_DEVELOPMENTS_OFFICE =  gql`
query getListings($tagId: String) {
  listings(
    where: { tagId: $tagId }, 
    first: 25
    after: "") {
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
          contentLivingArea {
            livingArea
            priceMax
            priceMin
          }
          views
        }
      }
    }
  }
}
`;

// Admin Query 
export const ADMIN_GET_ALL_AGENTS = gql`
query GetAgentInfo {
    dataAgent(agentId: null, agentType: AGENT) {
      id
      databaseId
      email
      firstName
      lastName
      phone
      position
      avatarProfile
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
  $tiktok: String,
  $rumble: String,
  $youtube: String,
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
      youtube: $youtube,
      tiktok: $tiktok,
      rumble: $rumble,
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