import React from 'react'
// components
import AvatarAgent from './AvatarAgent'
import InfoCard from './InfoCard'
import SkeletonCardAgent from './SkeletonCardAgent'
import AlertError from '../AlertError'
// mantine
import { Box } from '@mantine/core';
// styles 
import styles from './styles.ca.module.scss'


const CardAgent = ({isLoading, error, dataAgent}) => {

    if (isLoading) {
        return (
            <SkeletonCardAgent />
        )
    }

    if (error || !dataAgent) {
        return (
            <AlertError
                label='Error!'
                description='Please wait a few minutes before you try again'
            />
        )
    }

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