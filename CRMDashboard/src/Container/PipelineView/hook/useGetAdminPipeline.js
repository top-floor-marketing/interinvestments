import { useState } from 'react'
// react-query
import { useQueryHelper } from '../../../GraphqlClient/useRequest'
import { ALL_LEADS_PIPELINE } from '../../../GraphqlClient/pipeline.gql';

import { USER_ROLES_CRM } from '../../../GlobalStore/utils';

import get from 'lodash/get';
import map from 'lodash/map';

const useGetAdminPipeline = ({ agentType }) => {

    const [dataPipeline, setDataPipeline] = useState([])

    const { isLoading, isError, refetch } = useQueryHelper({
        name: `ALL_LEADS_PIPELINE`,
        gql: ALL_LEADS_PIPELINE,
        config: {
            enabled: (agentType === USER_ROLES_CRM.ADMIN),
            onSuccess: (response) => {
                console.log("ALL_LEADS_PIPELINE ", response);
                let allData = {
                    dataNotContacted: [],
                    dataContacted: [],
                    dataShowing: [],
                    dataContract: [],
                    dataASk: []
                }

                map(get(response, ["dataAgent"], []), (val) => {

                    

                })
                // dataNotContacted
                // dataContacted
                // dataShowing
                // dataContract
                // dataASk


                /*
 {
    "id":169,
    "firstName":"juantest",
    "lastName":"ubau",
    "email":"gustavo1234@data.com",
    "date":"2022-10-06T21:33:32Z",
    "comments":"<p>commentarios generales para el usuario lead en su estado</p>\n",
    "currentStatus":{
       "statusId":53,
       "name":"Contract"
    },
    "agentId":30
 }
 
                */
            },
        }
    });

    return {
        isLoading,
        isError,
        data: dataPipeline,
        refetch,
    }

}

export default useGetAdminPipeline;