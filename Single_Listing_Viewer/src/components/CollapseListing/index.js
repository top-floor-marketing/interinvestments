import React from 'react'
// components
import ContendCollapse from './ContendCollapse'
import ButtonProgress from '../ButtonProgress'
// mantine
import { Box, Divider } from '@mantine/core';
//componen
import CollapseContainer from './CollapseContainer'
// css
import styles from './styles.cl.module.scss';

import get from 'lodash/get';

const CollapseListing = (props) => {
    const { data, idListing } = props

    const SpecsData = () => {
        const newArray = []
        Array({ ...data.specs }).map((value) => (
            newArray.push(
                {
                    title: 'Bath',
                    value: value.bath
                },
                {
                    title: 'Bedrooms',
                    value: value.bedrooms
                },
                {
                    title: 'Sqft',
                    value: value.sqft
                },
            )
        ))
        return newArray
    }


    const finishesData = () => {
        const newArray = []
        Array({ ...data.finishes }).map((value) => (
            newArray.push(
                {
                    title: 'Appliances',
                    value: value.appliances
                },
                {
                    title: 'Bathrooms',
                    value: value.bathrooms
                },
                {
                    title: 'Flooring',
                    value: value.flooring
                },
                {
                    title: 'kitchenCabinets',
                    value: value.kitchenCabinets
                },
            )
        ))
        return newArray
    }

    const floorplansData = () => {
        const allPdf = get(data, ["floorplans", "allPdf"], [])
        return allPdf.map((value) => {
            return (
                {
                    title: value.title,
                    value: get(value, ["itemPdf",], [])
                }
            )
        });
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
                title='Specs'
                index='01'
            >
                <ContendCollapse
                    data={SpecsData()}
                />
            </CollapseContainer>
            <CollapseContainer
                delayAnimatio='200'
                title='Finishes'
                index='02'
            >
                <ContendCollapse
                    data={finishesData()}
                />
            </CollapseContainer>

            <CollapseContainer
                delayAnimatio='300'
                title='Floorplans'
                index='03'
            >
                <ContendCollapse
                    data={floorplansData()}
                />
            </CollapseContainer>

            <CollapseContainer
                delayAnimatio='400'
                title='Team'
                index='04'
            >
                <ContendCollapse
                    data={TeamData()}
                />
            </CollapseContainer>
            <CollapseContainer
                delayAnimatio='500'
                title='Downloads'
                index='05'
                defaultOpen={true}
            >
                <ButtonProgress idListing={idListing} />
            </CollapseContainer>
        </Box>
    )
}

export default CollapseListing