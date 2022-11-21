
import { useEffect, useState } from "react";
import useClientGlobalStore from "../../GlobalStore/useClientGlobalStore";
import DetailLeadByAgent from "./detailLeadByAgent";
import { USER_ROLES_CRM } from "../../GlobalStore/utils";
import { LOCAL_STORAGE } from "../../Utils/globalConstants";

import { UserCircle } from 'tabler-icons-react';

import { Tabs } from '@mantine/core';

const LeadDetailView = () => {

    const { state: { user: { infoUser: { agentType } } },
    } = useClientGlobalStore();

    const [verifyLocalStorage, setVerifyLocalStorage] = useState(null);

    useEffect(() => {
        const infoInLocalStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE.LEAD_DETAIL_ID));
        // if admin use key allAgents for N array of agents for lead
        // if agent use key idAgent for single agent in lead
        setVerifyLocalStorage(infoInLocalStorage);
    }, [agentType]);

    if (!verifyLocalStorage) {
        return null;
    }

    if (agentType === USER_ROLES_CRM.ADMIN && verifyLocalStorage) {

        return (
            <Tabs defaultValue={`${verifyLocalStorage?.allAgents[0].id}`}>

                <Tabs.List>
                    {
                        (verifyLocalStorage?.allAgents).map((e, index) => (
                            <Tabs.Tab
                                key={index}
                                value={`${e.id}`}
                                icon={<UserCircle size={14} />}>
                                {e.fullName}
                            </Tabs.Tab>
                        ))
                    }
                </Tabs.List>

                {
                    (verifyLocalStorage?.allAgents).map((e, index) => (
                        <Tabs.Panel style={{ paddingTop: "1rem" }} key={index} value={`${e.id}`} pt="xs">
                            <DetailLeadByAgent 
                            isAdmin={agentType === USER_ROLES_CRM.ADMIN} 
                            idAgent={e.id} idLead={verifyLocalStorage?.idLead} />
                        </Tabs.Panel>
                    ))
                }

            </Tabs>
        )
    } else {
        return (
            <DetailLeadByAgent idAgent={verifyLocalStorage?.idAgent} idLead={verifyLocalStorage?.idLead} />
        )
    }


}

export default LeadDetailView;