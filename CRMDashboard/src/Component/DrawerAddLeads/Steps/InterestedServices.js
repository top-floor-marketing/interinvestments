import React from 'react'
// components
import { Skeletong, SegmentMulti } from '../SegmentMulti'
import AlertError from '../../AlertError'
// mantine
import { Box, createStyles } from '@mantine/core';
// react-query
import { useQueryHelper } from '../../../GraphqlClient/useRequest';
import { GET_LEADS_SERVICES } from '../../../GraphqlClient/leads.gql';
// global store
import useClientGlobalStore from '../../../GlobalStore/useClientGlobalStore'

const useStyles = createStyles((theme, _params) => {
    return ({
        container: {
            marginTop: '30px',
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '14px',
            [`@media (min-width: ${theme.breakpoints.md}px)`]: {
                flexDirection: 'row',
            }
        }
    })
});

const InterestedServices = () => {
    const {
        state: {
            addLeads: { serviceData }
        },
        actions: { setServicesData }
    } = useClientGlobalStore()
    const { classes } = useStyles()

    const { isLoading, error, data } = useQueryHelper({
        name: 'GET_LEADS_SERVICES',
        gql: GET_LEADS_SERVICES
    });

    if (isLoading) {
        return (
            <Skeletong />
        )
    }

    if (error) {
        return (
            <Box className={classes.container}>
                <AlertError
                    label='Error!'
                    description='Please wait a few minutes before you try again'
                />
            </Box>
        )
    }

    const listServices = () => {
        const newList = []
        if (data) {
            data.servicesTypes.nodes.map(value => (
                newList.push({
                    label: value.name,
                    value: `${value.databaseId}`
                })
            ))
        }
        return newList
    }

    const onChangeSegment = (value) => {
        setServicesData(value)
    }


    return (
        <Box className={classes.container}>
            <SegmentMulti
                value={serviceData}
                onChange={(value) => onChangeSegment(value)}
                data={listServices()}
            />
        </Box>
    )
}

export default InterestedServices