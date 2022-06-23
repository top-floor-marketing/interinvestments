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

const CollapseListing = (props) => {
    const { data } = props
    const addressData = () => {
        const newArray = []
        Array({ ...data.address }).map((value) => (
            newArray.push(
                {
                    title: 'Address Line 1',
                    value: value.addressLine1
                },
                {
                    title: 'address 2',
                    value: value.address2
                },
                {
                    title: 'city',
                    value: value.city
                },
                {
                    title: 'state',
                    value: value.state
                },
                {
                    title: 'zip',
                    value: value.zip
                }
            )
        ))
        return newArray
    }

    const floorplansData = () => {
        const newArray = []
        Array({ ...data.floorplans }).map((value) => (
            newArray.push(
                {
                    title: 'Group Name',
                    value: value.fieldGroupName
                },
                {
                    title: 'Floorplan beds',
                    value: value.floorplanNBeds
                },
                {
                    title: 'Floorplan ac sqft',
                    value: value.floorplanAcSqft
                },
                {
                    title: 'Floorplan hbaths',
                    value: value.floorplanNHbaths
                },
                {
                    title: 'Floorplan baths',
                    value: value.floorplanNBaths
                },
                {
                    title: 'Floorplan total sqft',
                    value: value.floorplanTotalSqft
                }
            )
        ))
        return newArray
    }

    const TeamData = () => {
        const newArray = []
        Array({ ...data.team }).map((value) => (
            newArray.push(
                {
                    title: 'Arquitect',
                    value: value.arquitect
                },
                {
                    title: 'Group Name',
                    value: value.fieldGroupName
                },
                {
                    title: 'interior Designer',
                    value: value.interiorDesigner
                },
                {
                    title: 'landscape Architect',
                    value: value.landscapeArchitect
                },
                {
                    title: 'payment Structure',
                    value: value.paymentStructure
                }
            )
        ))
        return newArray
    }

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
                <ContendCollapse
                    data={addressData()}
                />
            </CollapseContainer>
            <CollapseContainer
                delayAnimatio='500'
                title='Floorplans'
                index='02'
            >
                <ContendCollapse
                    data={floorplansData()}
                />
            </CollapseContainer>
            <CollapseContainer
                delayAnimatio='800'
                title='Team'
                index='03'
            >
                <ContendCollapse
                    data={TeamData()}
                />
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