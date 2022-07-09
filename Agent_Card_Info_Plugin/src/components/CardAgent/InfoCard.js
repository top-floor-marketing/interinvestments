import React from 'react'
// mantine
import { Text, Box } from '@mantine/core';
// styles 
import styles from './styles.ca.module.scss'

const InfoCard = () => {
    return (
        <>
            <Text
                component='h3'
                className={styles.titleNameAgent}
            >
                Emilio Cardenal
            </Text>
            <Text
                component='span'
                className={styles.PositionAgent}
            >
                Real Estate Broker / Founder
            </Text>
            <Text
                component='p'
                className={styles.contentCArdAgent}
            >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Text>
            <Box className={styles.contactAgent}>
                <Text
                    component='a'
                    href='mailto: emilio@interinvestments.us'
                >
                    emilio@interinvestments.us
                </Text>
                <br />
                <Text
                    component='a'
                    href='tel:305-456-6839'
                >
                    305-456-6839
                </Text>
            </Box>

        </>
    )
}

export default InfoCard