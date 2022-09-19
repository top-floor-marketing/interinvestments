import React from 'react'
// mantine
import { Box, Text, Badge, Divider, Tooltip } from '@mantine/core';
import { MapPin, ListDetails } from 'tabler-icons-react';
import { RichTextEditor } from '@mantine/rte';
// global store
import useClientGlobalStore from '../../../GlobalStore/useClientGlobalStore'
// styles 
import useStyles from './styles'
// components
import CardAvatarDrawer from '../InternalComponents/CardAvatarDrawer'

const FinalStepp = () => {
    const { state } = useClientGlobalStore()
    const { addLeads, global } = state
    const { classes } = useStyles();

    // console.log('addLeads', addLeads)

    const statusUserLead = addLeads.stateLeads
        ? global.statusUserLead.find((item) => (item.value === addLeads.stateLeads)).label
        : 'Not Contacted'

    const colorStatus = () => {

        // console.log('statusUserLead', statusUserLead)

        if (statusUserLead) {
            switch (statusUserLead) {
                case 'Ask Referrals':
                    return 'grape'

                case 'Contacted':
                    return 'primary'

                case 'Contract':
                    return 'success'

                case 'Not Contacted':
                    return 'error'

                case 'Showing':
                    return 'secondary'

                default:
                    return 'primary'
            }
        } else {
            return 'error'
        }
    }





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
                        style={{ width: '103px' }}
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
                            Status Leads:
                        </strong>
                    </Text>
                    <Tooltip
                        position='right'
                        withArrow
                        label={statusUserLead}
                    >
                        <Badge
                            style={{ width: '103px' }}
                            size="lg"
                            variant="outline"
                            color={colorStatus()}
                        >
                            {statusUserLead}
                        </Badge>
                    </Tooltip>
                </Box>

                <Box className={classes.containerInfo}>
                    <Text component='span'>
                        <strong>
                            First Name:
                        </strong>
                    </Text>
                    <Text component='span'>{addLeads.dataForm.firstName}</Text>
                </Box>

                <Box className={classes.containerInfo}>
                    <Text component='span'>
                        <strong>
                            Last Name:
                        </strong>
                    </Text>
                    <Text component='span'>{addLeads.dataForm.lastName}</Text>
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

                <Box
                    style={{ flexDirection: 'column', alignItems: 'start' }}
                    className={classes.containerInfo}
                >
                    <Text component='span'>
                        <strong>
                            Note Leads:
                        </strong>
                    </Text>
                    <RichTextEditor
                        style={{ width: '100%' }}
                        value={addLeads.noteLeads}
                        readOnly
                    />
                </Box>

                <Divider
                    my="xs"
                    label="Optional info"
                    className={`${classes.title} ${classes.inputFull}`}
                />

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