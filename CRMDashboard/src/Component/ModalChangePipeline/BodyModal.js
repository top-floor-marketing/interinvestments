import React, { useState } from 'react'
// componen
import SelectStateLeads from '../SelectStateLeads'
import { notificationError, notificationSuccess } from "../../Component/Notifications";
// mantine dev
import { Box, Textarea, Group, SimpleGrid, Text, Button, createStyles } from '@mantine/core';
import { useMutationHelper } from "../../GraphqlClient/useRequest";
import { COMMENTS_USER_LEAD } from "../../GraphqlClient/leads.gql";

import { Mail, User } from 'tabler-icons-react';

import ChipStatusLead from '../ItemLeadVirtual/chipStatusLead';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';

const useStyles = createStyles((theme) => ({
    container: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: theme.other.spacing.p4
    },
    changeGrid: {
        marginTop: theme.other.spacing.p8,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: theme.other.spacing.p4,
        '.mantine-Text-root': {
            margin: "0px !important"
        }
    },
    selectContainer: {
        maxWidth: '350px !important'
    },
    badgeStatus: {
        width: "auto",
        marginRight: "auto",
        padding: theme.other.spacing.p4,
        borderRadius: "10px"
    },
}));

const BodyModal = ({ valueSelect, setvalueSelect, valueUserPipeline, onClose, refechPipeline }) => {

    const { classes } = useStyles();
    const [commentValue, setCommentValue] = useState("");

    const { mutate: comment_user_lead, isLoading } = useMutationHelper({
        name: "comment_user_lead",
        gql: COMMENTS_USER_LEAD,
        config: {
            onError: () => {
                // alert error
                notificationError({
                    id: 'add-leads-error',
                    position: 'top-right',
                    title: "Server error",
                    color: 'error',
                })
                onClose()
            },
            onSuccess: () => {
                notificationSuccess({
                    id: 'add-leads-error',
                    position: 'top-right',
                    title: "Success to change lead state",
                    color: 'success',
                })
                refechPipeline(get(valueUserPipeline, ['currentStatus', 'statusId'], 0), valueSelect)
                onClose()
            },
        },
    });

    const changeStateLead = () => {
        const { agentId, id } = valueUserPipeline;

        if (!valueSelect) onClose();

        const idCurrentState = get(valueUserPipeline, ["currentStatus", "statusId"], null);

        if (!isEqual(idCurrentState, valueSelect))
            comment_user_lead({
                variables: {
                    agentId,
                    statusId: valueSelect,
                    userLeadId: id,
                    comments: commentValue || ""
                },
            });
        else
            onClose();
    }

    return (
        <Box className={classes.container}>
            <SimpleGrid cols={1}>
                <Group >
                    <ChipStatusLead
                      className={classes.badgeStatus}
                        status={valueUserPipeline?.currentStatus?.name} />
                </Group>

                <Group spacing="1rem">
                    <User
                        size={24}
                    />
                    <Text component='span'>{valueUserPipeline?.firstName} {valueUserPipeline?.lastName}</Text>
                </Group>

                <Group spacing="1rem">
                    <Mail
                        size={24}
                    />
                    <Text component='span'>{valueUserPipeline?.email}</Text>
                </Group>
            </SimpleGrid>

            <SimpleGrid spacing="1rem" className={classes.changeGrid}>
                <Text color="dark" component='h3'>Change lead state:</Text>
                <Box className={classes.selectContainer}>
                    <SelectStateLeads
                        disabledList={[get(valueUserPipeline, ["currentStatus", "statusId"], null)]}
                        disabled={isLoading}
                        placeholder='Select new lead state'
                        value={valueSelect}
                        onChange={(idState) => setvalueSelect(idState)}
                    />
                </Box>

                <Textarea
                    placeholder="Comment"
                    label={null}
                    autosize
                    minRows={4}
                    maxRows={8}
                    value={commentValue}
                     onChange={(event) => setCommentValue(event.currentTarget.value)}
                />
            </SimpleGrid>

            <Group position='center'>
                <Button
                    disabled={isLoading}
                    color='error'
                    onClick={() => onClose()}
                >
                    Cancel
                </Button>
                <Button
                    disabled={isLoading}
                    loading={isLoading}
                    onClick={() => changeStateLead()}
                >
                    Submit
                </Button>
            </Group>
        </Box>
    )
}

export default BodyModal