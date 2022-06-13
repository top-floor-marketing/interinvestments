import React from 'react'
// compontes
import CardData from './CardData'
// mantine
import { Box } from '@mantine/core';
// css
import styles from './styles.dl.module.scss'

const DataLIsting = () => {
    return (
        <Box className={styles.container}>
            <Box className={styles.boxdata}>
                <CardData
                    number={500}
                    type='text'
                    description='Est. Date of Completion'
                />
                <CardData
                    number={700}
                    type='number'
                    description='Price Min'
                />
                <CardData
                    number={500}
                    type='number'
                    description='Price Max'
                />
                <CardData
                    number={846}
                    description='Total Units'
                />
            </Box>
        </Box>
    )
}

export default DataLIsting