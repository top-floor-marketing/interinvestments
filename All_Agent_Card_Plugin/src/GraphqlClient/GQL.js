import { gql } from "graphql-request";

const DATA_AGENT = gql`
  query dataAgent($agentType: MasterEnum!, $agentId: Int) {
    dataAgent(agentType: $agentType, agentId: $agentId) {
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
      linkedin
      twitter
    }
  }
`

export { DATA_AGENT }