import React from 'react'
// components
import GridAgend from '../GridAgend'
// mantine
import { Box, Text, Button } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons';
// styles
import styles from './Styles.CM.module.scss'

const Main = () => {
    return (
        <Box className={styles.containerMain}>
            <Text component='h3'>Our Agents</Text>
            <GridAgend />
            <Button variant='outline' className="mx-auto mt-3 btn-wp-primary-icon">
                Load More
                <IconChevronRight />
            </Button>
        </Box>
    )
}

export default Main