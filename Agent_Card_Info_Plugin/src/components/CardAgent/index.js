import React, { useState } from 'react'
// components
import AvatarAgent from './AvatarAgent'
import InfoCard from './InfoCard'
import SkeletonCardAgent from './SkeletonCardAgent'
import AlertError from '../AlertError'
// mantine
import { Box } from '@mantine/core';
// react-query
import { useQueryHelper } from '../../GraphqlClient/useRequest';
import { DATA_AGENT } from '../../GraphqlClient/GQL';
// styles 
import styles from './styles.ca.module.scss'

const URL_QUERY_ID_NAME = "agent-id";

const CardAgent = () => {
    const [dataAgent, setDataAgent] = useState(null)
    const urlParams = new URLSearchParams(window.location.search);
    const agentId = urlParams.get(URL_QUERY_ID_NAME);
    const leadAgentId = localStorage.getItem('lead-agent')

    let variables = {
        agentType: "AGENT",
    }

    if (agentId || leadAgentId) {
        variables = {
            agentType: "AGENT",
            agenId: (leadAgentId) ? parseInt(leadAgentId) : parseInt(agentId)
        }
    } else {
        variables = {
            agentType: "MASTER",
        }
    }

    const { isLoading, error, data } = useQueryHelper({
        name: 'DATA_AGENT',
        gql: DATA_AGENT,
        variables,
        config: {
            onSuccess: (req) => {
                setDataAgent(...req.dataAgent)
            }
        }
    });

    if (isLoading) {
        return (
            <SkeletonCardAgent />
        )
    }

    if (error || !data) {
        return (
            <AlertError
                label='Error!'
                description='Please wait a few minutes before you try again'
            />
        )
    }

    // console.log('dataAgent', dataAgent)

    return (
        <Box className={styles.containerCard}>
            <Box>
                <AvatarAgent dataAgent={dataAgent} />
            </Box>
            <Box className={styles.containInfoAgent}>
                <InfoCard dataAgent={dataAgent} />
            </Box>
        </Box>
    )
}

export { SkeletonCardAgent, AvatarAgent, InfoCard }

export default CardAgent