import React from 'react'
// mantine
import { Box, Divider } from '@mantine/core';
//componen
import CollapseContainer from './CollapseContainer'
// css
import styles from './styles.cl.module.scss'

const CollapseListing = () => {
    return (
        <Box className={styles.containerCollapse} >
            <Divider className={styles.dividerListing} my="sm" />
            <CollapseContainer />
            <CollapseContainer />
            <CollapseContainer />
        </Box>
    )
}

export default CollapseListing