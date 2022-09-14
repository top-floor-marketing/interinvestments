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
import isEmpty from 'lodash/isEmpty';

const CollapseListing = (props) => {
    const { data } = props

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
        Array({ ...data.specs }).map((value) => (
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
        return isEmpty(allPdf) ? [] : allPdf.map((value) => {
            return (
                {
                    title: value.pdf.title,
                    value: value.pdf.mediaItemUrl
                }
            )
        }) ;
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
                delayAnimatio='500'
                title='Floorplans'
                index='03'
            >
                <ContendCollapse
                    typeComponentValue='link'
                    // description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis a at earum repellat delectus voluptate, optio aliquid, nihil totam sint mollitia inventore aperiam accusantium tempora, esse sit nam dignissimos exercitationem?'
                    data={floorplansData()}
                />
            </CollapseContainer>
            <CollapseContainer
                delayAnimatio='800'
                title='Team'
                index='04'
            >
                <ContendCollapse
                    data={TeamData()}
                />
            </CollapseContainer>
            <CollapseContainer
                delayAnimatio='1100'
                title='Downloads'
                index='05'
            >
                <ButtonProgress />
            </CollapseContainer>
        </Box>
    )
}

export default CollapseListing