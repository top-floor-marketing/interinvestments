import React from 'react'
// components
import ContendCollapse from './ContendCollapse'
import ButtonProgress from '../ButtonProgress'
// mantine
import { Box, Divider } from '@mantine/core';
//componen
import CollapseContainer from './CollapseContainer'
// css
import styles from './styles.cl.module.scss'

const CollapseListing = () => {
    return (
        <Box className={styles.containerCollapse} >
            <Divider
                className={styles.dividerListing}
                my="sm"
                data-aos-once="true"
                data-aos-delay='200'
                data-aos-duration='2000'
                data-aos="zoom-in"
            />
            <CollapseContainer
                delayAnimatio='200'
                title='Address'
                index='01'
            >
                <ContendCollapse />
            </CollapseContainer>
            <CollapseContainer
                delayAnimatio='500'
                title='Floorplans'
                index='02'
            >
                <ContendCollapse />
            </CollapseContainer>
            <CollapseContainer
                delayAnimatio='800'
                title='Team'
                index='03'
            >
                <ContendCollapse />
            </CollapseContainer>
            <CollapseContainer
                delayAnimatio='1100'
                title='Downloads'
                index='04'
            >
                <ButtonProgress />
            </CollapseContainer>
        </Box>
    )
}

export default CollapseListing