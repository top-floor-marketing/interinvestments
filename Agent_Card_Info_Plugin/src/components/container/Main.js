import React from 'react'
// components
import CardAgent from '../CardAgent'
// mantine
import { Box, Text } from '@mantine/core';
// react-query
import { useQueryHelper } from '../../GraphqlClient/useRequest';
import { DATA_AGENT } from '../../GraphqlClient/GQL';
// styles
import style from '../../cardAgent.ca.module.scss'

const URL_QUERY_ID_NAME = "agent-id";

const Main = () => {

    const urlParams = new URLSearchParams(window.location.search);
    const agentId = parseInt(urlParams.get(URL_QUERY_ID_NAME));

    let variables = {
        agentType: "AGENT",
    }

    if (agentId) {
        variables = {
            agentType: "AGENT",
            agentId
        }
    } else {
        variables = {
            agentType: "MASTER",
        }
    }

    // req.dataAgent
    const { isLoading, error, data } = useQueryHelper({
        name: 'DATA_AGENT',
        gql: DATA_AGENT,
        variables,
    });

    return (
        <Box className={style.containerMainAgentCarInfo}>
            <Box className={style.containerCard}>
                <Box className={`${style.titleCard} ${(variables.agentType === 'MASTER') ? style.titleOffice : ''} `}>
                    <Text component='h4'>
                        {
                            (variables.agentType === 'MASTER') ? "OFFICE" : "Your agent"
                        }
                    </Text>
                </Box>
                <Box className='w-full lg:w-3/4'>
                    <CardAgent isLoading={isLoading} error={error} dataAgent={data?.dataAgent[0] || null} />
                </Box>
            </Box>
        </Box>
    )
}

export default Main