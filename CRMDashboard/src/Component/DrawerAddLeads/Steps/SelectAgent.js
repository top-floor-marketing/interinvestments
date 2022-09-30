import React, { useState } from 'react'
// components
import SelectUserLead from '../../../Component/SelectUserLead'
// react query
import { useQueryHelper } from "../../../GraphqlClient/useRequest";
import { ADMIN_GET_ALL_AGENTS } from "../../../GraphqlClient/agentProfile.gql";
//  utils
import get from 'lodash/get'
import { orderAgentByName } from '../../../Container/AgentsView/hooks/utils.service';
// global store
import useClientGlobalStore from "../../../GlobalStore/useClientGlobalStore";

const SelectAgent = () => {
    const [dataSelectAgentLeads, setDataselectAgentLeads] = useState([])
    const { state: { addLeads: { selectedAgent } }, actions: { setSelectedAgent } } = useClientGlobalStore();

    const { isLoading, isError } = useQueryHelper({
        name: "admin-get-all-agents-for-wizard",
        gql: ADMIN_GET_ALL_AGENTS,
        config: {
            onSuccess: (response) => {
                setDataselectAgentLeads(orderAgentByName(get(response, ["dataAgent"], [])));
            },
            onerror: () => {
                setDataselectAgentLeads([])
            }
        },
    });

    const onchangeSelectAgentLeads = (userSelegted) => {
        setSelectedAgent(userSelegted)
    }

    // console.log('selectedAgent', selectedAgent)

    return (
        <SelectUserLead
            value={get(selectedAgent, ['id'], null)}
            labelSelect="Select an Agent"
            placeholder='Agent Name...'
            typeDropdow='Avatar'
            isLoading={isLoading}
            isError={isError}
            data={dataSelectAgentLeads}
            onChange={(val) => onchangeSelectAgentLeads(val)}
        />
    )
}

export default SelectAgent