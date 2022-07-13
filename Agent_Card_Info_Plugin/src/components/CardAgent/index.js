import React from 'react'
// components
import AvatarAgent from './AvatarAgent'
import InfoCard from './InfoCard'
// mantine
import { Box } from '@mantine/core';
// styles 
import styles from './styles.ca.module.scss'

const CardAgent = () => {

    // crm-agent
    return (
        <Box className={styles.containerCard}>
            <Box className={styles.containAvatarAgent}>
                <AvatarAgent />
            </Box>
            <Box className={styles.containInfoAgent}>
                <InfoCard />
            </Box>
        </Box>
    )
}

export default CardAgent