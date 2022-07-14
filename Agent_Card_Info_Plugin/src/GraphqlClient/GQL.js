import { gql } from "graphql-request";

const DATA_AGENT = gql`
  query dataAgent($agentType: MasterEnum!, $agenId: Int) {
    dataAgent(agentType: $agentType, agenId: $agenId) {
      id
      email
      name
      phone
      position
      avatar
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