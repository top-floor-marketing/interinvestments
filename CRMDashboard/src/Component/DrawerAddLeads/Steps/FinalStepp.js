import React from 'react'
// mantine
import { Box, Text, Badge, Divider, Tooltip } from '@mantine/core';
import { MapPin, ListDetails, AlertCircle } from 'tabler-icons-react';
import { RichTextEditor } from '@mantine/rte';
// global store
import useClientGlobalStore from '../../../GlobalStore/useClientGlobalStore'
// styles 
import useStyles from './styles'
// components
import CardAvatarDrawer from '../InternalComponents/CardAvatarDrawer'
// utils
import { USER_ROLES_CRM, PIPELINE_STATUS } from '../../../GlobalStore/utils'

import isEmpty from 'lodash/isEmpty';
import toLower from 'lodash/toLower';

const FinalStepp = () => {
    const { state } = useClientGlobalStore()
    const { user: { infoUser: { agentType } }, addLeads, global } = state
    const { classes } = useStyles();

    const statusUserLead = addLeads.stateLeads
        ? global.statusUserLead.find((item) => (item.value === addLeads.stateLeads)).label
        : 'Not Contacted'

    const colorStatus = () => {
        if (statusUserLead) {
            switch (toLower(statusUserLead)) {
                case PIPELINE_STATUS.ASK_REFERRALS:
                    return 'grape'

                case PIPELINE_STATUS.CONTACTED:
                    return 'primary'

                case PIPELINE_STATUS.CONTRACT:
                    return 'success'

                case PIPELINE_STATUS.NOT_CONTACTED:
                    return 'error'

                case PIPELINE_STATUS.SHOWING:
                    return 'secondary'

                default:
                    return 'primary'
            }
        } else {
            return 'error'
        }
    }

    return (
        <>
            {
                agentType === USER_ROLES_CRM.ADMIN ? (
                    <Box
                        style={{ padding: '14px', flexDirection: 'column', alignItems: 'start' }}
                        className={classes.containerInfo}
                    >
                        <Text
                            className={classes.titleFinalStepIfo}
                            component='h3'
                        >
                            Selected agent
                        </Text>

                        {
                            (!isEmpty(addLeads.selectedAgent)) ? (
                                <CardAvatarDrawer
                                    type='LISTING'
                                    DataInterested={{
                                        photo: addLeads.selectedAgent.avatarProfile,
                                        title: `${addLeads.selectedAgent.firstName} ${addLeads.selectedAgent.lastName}`,
                                        databaseId: '',
                                        neighborhood: addLeads.selectedAgent.email
                                    }}
                                />
                            ) : (
                                <Badge
                                    color='red'
                                    variant="outline"
                                    className={classes.BadgeFinalStepp}
                                    size="lg"
                                    leftSection={<AlertCircle size={16} />}
                                >
                                    Agent not assigned
                                </Badge>
                            )
                        }

                    </Box>
                ) : null
            }
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
        </>
    )
}

export default FinalStepp