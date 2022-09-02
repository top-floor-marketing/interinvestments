import { gql } from "graphql-request";

export const GET_LEADS_LIST = gql`
  query dataAgent($agentId: Int = 10, $agentType: MasterEnum) {
    dataAgent(agentType: AGENT, agenId: 30) {
      leads {
        nodes {
          leadId
          title
          leads {
            relationshipAgent {
              userId
            }
          }
        }
      }
    }
  }
`;