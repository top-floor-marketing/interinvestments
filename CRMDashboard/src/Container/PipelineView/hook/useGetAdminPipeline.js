import { useState } from 'react'
// react-query
import { useQueryHelper } from '../../../GraphqlClient/useRequest'
import { ALL_LEADS_PIPELINE } from '../../../GraphqlClient/pipeline.gql';

import { USER_ROLES_CRM, PIPELINE_STATUS } from '../../../GlobalStore/utils';

import get from 'lodash/get';
import forEach from 'lodash/forEach';
import toLower from 'lodash/toLower';

const useGetAdminPipeline = ({ agentType }) => {

    const [dataPipeline, setDataPipeline] = useState({
        dataNotContacted: [],
        dataContacted: [],
        dataShowing: [],
        dataContract: [],
        dataASk: []
    });

    const getDataForPipeline = (data) => {
        return {
            "id": get(data, ["userLead", "id"], null),
            "firstName": get(data, ["userLead", "firstName"], null),
            "lastName": get(data, ["userLead", "lastName"], null),
            "email": get(data, ["userLead", "email"], null),
            "agentId": get(data, ["agent", "databaseId"], null),
            "agentAvatar": get(data, ["agent", "avatarProfile"], null),
            "agentEmail": get(data, ["agent", "email"], null),
            "agentFullName":`${get(data, ["agent", "firstName"], "")} ${get(data, ["agent", "lastName"], "")}`,
            "date": get(data, ["status", "0", "date"], null),
        }
    }

    const { isLoading, isError, refetch } = useQueryHelper({
        name: [`ALL_LEADS_PIPELINE`],
        gql: ALL_LEADS_PIPELINE,
        config: {
            cacheTime: 5 * 60 * 1000, // 1 minute
            enabled: (agentType === USER_ROLES_CRM.ADMIN),
            onSuccess: (response) => {

                let allData = {
                    dataNotContacted: [],
                    dataContacted: [],
                    dataShowing: [],
                    dataContract: [],
                    dataASk: []
                }

                forEach(get(response, ["dataAgent"], []), (val) => {

                    forEach(get(val, ["statuses"], []), (valStatuses) => {

                        if(!valStatuses?.currentStatus || !valStatuses?.userLead) return;

                        if (!get(valStatuses, ["userLead", "firstName"], null) && !get(valStatuses, ["userLead", "lastName"], null)) return;

                        if(toLower(get(valStatuses, ["userLead", "firstName"], null)) === 'firstname' ||
                        toLower(get(valStatuses, ["userLead", "lastName"], null)) === 'lastname' )  return;

                        switch (toLower(valStatuses?.currentStatus)) {

                            case PIPELINE_STATUS.NOT_CONTACTED:
                                allData.dataNotContacted.push(getDataForPipeline(valStatuses))
                                break;
                            case PIPELINE_STATUS.CONTACTED:
                                allData.dataContacted.push(getDataForPipeline(valStatuses))
                                break;
                            case PIPELINE_STATUS.SHOWING:
                                allData.dataShowing.push(getDataForPipeline(valStatuses))
                                break;
                            case PIPELINE_STATUS.CONTRACT:
                                allData.dataContract.push(getDataForPipeline(valStatuses))
                                break;
                            case PIPELINE_STATUS.ASK_REFERRALS:
                                allData.dataASk.push(getDataForPipeline(valStatuses))
                                break;

                            default: break;
                        }
                    })

                })

                setDataPipeline(allData);

            },
        }
    });

    return {
        isLoading:(agentType === USER_ROLES_CRM.ADMIN) ? isLoading : false,
        isError,
        data: dataPipeline,
        refetch,
    }

}

export default useGetAdminPipeline;