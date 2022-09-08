import { useState } from 'react'
// react-query
import { useQueryHelper } from '../../../GraphqlClient/useRequest'
import { PIPELINE } from '../../../GraphqlClient/pipeline.gql'

const useGetPipelineLeads = ({ agentID }) => {
    const [dataPipeline_NC, setDataPipeline_NC] = useState([])
    const [dataPipeline_CO, setDataPipeline_CO] = useState([])
    const [dataPipeline_ASK, setDataPipeline_ASK] = useState([])
    const [dataPipeline_CON, setDataPipeline_CON] = useState([])
    const [dataPipeline_SH, setDataPipeline_SH] = useState([])
    const [globalLoading, setGlobalLoading] = useState(true)
    const [isError, setisError] = useState(false)



    // 1 "Ask Referrals"
    useQueryHelper({
        name: 'LISTINGS_CATEGORY_By_AllListingView',
        gql: PIPELINE,
        variables: {
            agentId: agentID,
            statusId: 54
        },
        config: {
            onSuccess: (req) => {
                // set values category
                console.log('valuePipeline', req)
            },
            onError: () => {
                setisError(true)
            },
        }
    });



    return {
        globalLoading,
        isError,
        PipelineData: {
            notContacted: dataPipeline_NC,
            contacted: dataPipeline_CO,
            askReferrals: dataPipeline_ASK,
            contract: dataPipeline_CON,
            showing: dataPipeline_SH
        }
    }

}

export default useGetPipelineLeads