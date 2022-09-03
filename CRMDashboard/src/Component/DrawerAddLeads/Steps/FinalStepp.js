import React from 'react'
// mantine
import { Box, Text, Badge, Divider } from '@mantine/core';
import { MapPin, ListDetails } from 'tabler-icons-react';
// global store
import useClientGlobalStore from '../../../GlobalStore/useClientGlobalStore'
// styles 
import useStyles from './styles'
// components
import CardAvatarDrawer from '../InternalComponents/CardAvatarDrawer'

const FinalStepp = () => {
    const { state: { addLeads } } = useClientGlobalStore()
    const { classes } = useStyles();

   //  console.log('addLeads Store', addLeads)

    return (
        <Box className={classes.containerFinalSteps}>
            <Box className={`${classes.contedInterested} ${classes.contendInfo}`}>
                <Text
                    className={classes.titleFinalStepIfo}
                    component='h3'
                >
                    Info Leads
                </Text>
                <Box className={classes.containerInfo}>
                    <Text component='span'>
                        <strong>
                            Type Leads :
                        </strong>
                    </Text>
                    <Badge
                        className={classes.BadgeFinalStepp}
                        size="lg"
                        leftSection={
                            ((addLeads.typeLeads) === "LISTING")
                                ? <MapPin size={16} />
                                : <ListDetails size={16} />
                        }
                    >
                        {addLeads.typeLeads}
                    </Badge>
                </Box>
                <Box className={classes.containerInfo}>
                    <Text component='span'>
                        <strong>
                            Name Leads:
                        </strong>
                    </Text>
                    <Text component='span'>{addLeads.dataForm.nameLeads}</Text>
                </Box>

                <Box className={classes.containerInfo}>
                    <Text component='span'>
                        <strong>
                            Email:
                        </strong>
                    </Text>
                    <Text component='span'>{addLeads.dataForm.email}</Text>
                </Box>

                <Box className={classes.containerInfo}>
                    <Text component='span'>
                        <strong>
                            PhoneNumber:
                        </strong>
                    </Text>
                    <Text
                        href={`tel:${addLeads.dataForm.phoneNumber}`}
                        className={classes.linkPhone}
                        component='a'
                    >
                        {addLeads.dataForm.phoneNumber}
                    </Text>
                </Box>

                {
                    // <Box className={classes.containerInfo}>
                    //     <Text component='span'>
                    //         <strong>
                    //             Note:
                    //         </strong>
                    //     </Text>
                    //     <Spoiler maxHeight={70} showLabel="Show more" hideLabel="Hide">
                    //         <Text component='span'>{addLeads.dataForm.note}</Text>
                    //     </Spoiler>
                    // </Box>
                }

                <Divider
                    my="xs"
                    label="Optional info"
                    className={`${classes.title} ${classes.inputFull}`}
                />

                <Box className={classes.containerInfo}>
                    <Text component='span'>
                        <strong>
                            Other Name:
                        </strong>
                    </Text>
                    <Text component='span'>{addLeads.dataForm.otherNameLeads || 'N/A'}</Text>
                </Box>

                <Box className={classes.containerInfo}>
                    <Text component='span'>
                        <strong>
                            Other Email:
                        </strong>
                    </Text>
                    <Text component='span'>{addLeads.dataForm.otherEmail || 'N/A'}</Text>
                </Box>

                <Box className={classes.containerInfo}>
                    <Text component='span'>
                        <strong>
                            Other Phone Number:
                        </strong>
                    </Text>
                    <Text
                        href={`tel:${addLeads.dataForm.otherPhoneNumber || null}`}
                        className={classes.linkPhone}
                        component='a'
                    >
                        {addLeads.dataForm.otherPhoneNumber || 'N/A'}
                    </Text>
                </Box>

            </Box>
            <Box style={{ width: '100%' }} className={classes.contedInterested}>
                <Text
                    className={classes.titleFinalStepIfo}
                    component='h3'
                >
                    Interested in
                </Text>
                {
                    (addLeads.typeLeads) === "LISTING" ? (
                        addLeads.listingData.map((value, key) => (
                            <CardAvatarDrawer
                                type='LISTING'
                                key={key}
                                DataInterested={value}
                            />
                        ))
                    ) : (
                        addLeads.serviceData.map((value, key) => (
                            <CardAvatarDrawer
                                type='SERVICES'
                                key={key}
                                DataInterested={value}
                            />
                        ))
                    )
                }
            </Box>
        </Box>
    )
}

export default FinalStepp