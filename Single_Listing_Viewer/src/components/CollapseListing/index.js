import React from 'react'
// components
import ContendCollapse from './ContendCollapse'
import TableContendCollapse from './TableContendCollapse';
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
                    title: 'Bedrooms',
                    value: value.bedrooms
                },
                {
                    title: 'Bathrooms',
                    value: value.bath
                },
                {
                    title: 'Living SqFt',
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
        const allPdf = get(data, ["floorplans"], []) || []
        return allPdf.map((value) => {
            return ({ ...value.floorplans })
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
                    title: 'Interior Designer',
                    value: value.interiorDesigner
                },
                {
                    title: 'Landscape Architect',
                    value: value.landscapeArchitect
                },
                {
                    title: 'Payment Structure',
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
                <TableContendCollapse
                    columns={[
                        {
                            title: 'Name',
                            dataIndex: 'name',
                        },
                        {
                            title: 'Pdf File',
                            dataIndex: 'pdf',
                        },
                        {
                            title: 'Bed/Bath',
                            dataIndex: 'bedbath',
                        },
                        {
                            title: 'AC Sqft',
                            dataIndex: 'acSqft',
                        },
                        {
                            title: 'Total Sqft',
                            dataIndex: 'totalSqft',
                        }
                    ]}
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