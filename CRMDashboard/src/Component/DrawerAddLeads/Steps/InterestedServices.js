import React, { useEffect } from 'react'
// components
import { Skeletong, SegmentMulti } from '../SegmentMulti'
import AlertError from '../../AlertError'
// mantine
import { Box, createStyles } from '@mantine/core';
// react-query
import { useQueryHelper } from '../../../GraphqlClient/useRequest';
import { GET_LEADS_SERVICES } from '../../../GraphqlClient/services.gql';
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
        actions: { setServicesData, setTotalServices }
    } = useClientGlobalStore()
    const { classes } = useStyles()

    const { isLoading, error, data } = useQueryHelper({
        name: 'GET_LEADS_SERVICES',
        gql: GET_LEADS_SERVICES
    });

    useEffect(() => {
        if (data) {
            setTotalServices(data.servicesTypes.nodes.map(value => ({
                label: value.name,
                value: `${value.databaseId}`
            })))
        }
    }, [data, setTotalServices])

    const listServices = () => {
        let newList = []
        if (data) {
            newList = data.servicesTypes.nodes.map(value => ({
                label: value.name,
                value: `${value.databaseId}`
            }))
        }
        return newList
    }


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