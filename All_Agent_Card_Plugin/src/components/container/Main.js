import React, { useState } from 'react'
// components
import GridAgend from '../GridAgend'
import AlertError from '../AlertError'
// mantine
import { Box, Text, Button } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons';
// styles
import styles from './Styles.CM.module.scss'

// react-query
import { useQueryHelper } from '../../GraphqlClient/useRequest';
import { DATA_AGENT } from '../../GraphqlClient/GQL';

const Main = () => {
    const [listAgent, setListAgent] = useState(null)

    const { isLoading, error } = useQueryHelper({
        name: 'DATA_AGENT_BY_ALL_AGent',
        gql: DATA_AGENT,
        variables: {
            agentType: "AGENT",
        }
        ,
        config: {
            onSuccess: (req) => {
                setListAgent([...req.dataAgent])
            }
        }
    });

    if (error) {
        return (
            <Box className={styles.containerMain}>
                <Text component='h3'>Our Agents</Text>
                <Box className={styles.BoxAlertError}>
                    <AlertError
                        label='Error!'
                        description='Please wait a few minutes before you try again'
                    />
                </Box>
            </Box>
        )
    }


    return (
        <Box className={styles.containerMain}>
            <Text component='h3'>Our Agents</Text>
            <GridAgend
                isLoading={isLoading}
                listAgent={(listAgent) ? listAgent : []}
            />
            {
                // (listAgent && listAgent.length !== 0) && (
                //     <Button
                //         disabled={isLoading}
                //         variant='outline'
                //         className="mx-auto mt-3 btn-wp-primary-icon"
                //     >
                //         Load More
                //         <IconChevronRight />
                //     </Button>
                // )
            }
        </Box>
    )
}

export default Main