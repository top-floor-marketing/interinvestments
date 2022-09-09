import React from 'react'
// componen
import SelectStateLeads from '../SelectStateLeads'
import { notificationError, notificationSuccess } from "../../Component/Notifications";
// mantine dev
import { Box, Textarea, Group, Badge, Text, Button } from '@mantine/core';
import { useMutationHelper } from "../../GraphqlClient/useRequest";
import { COMMENTS_USER_LEAD } from "../../GraphqlClient/leads.gql";

import ChipStatusLead from '../ItemLeadVirtual/chipStatusLead';
import get from 'lodash/get'

const BodyModal = ({ valueSelect, setvalueSelect, valueUserPipeline, onClose, refechPipeline }) => {

    const colorStatus = (statusUserLead) => {
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

    const { mutate: comment_user_lead, isLoading } = useMutationHelper({
        name: "comment_user_lead",
        gql: COMMENTS_USER_LEAD,
        config: {
            onError: () => {
                // alert error
                notificationError({
                    id: 'add-leads-error',
                    position: 'top-right',
                    title: "Error change state lead",
                    color: 'secondary',
                })
                // onclouse
                onClose()
            },
            onSuccess: () => {
                notificationSuccess({
                    id: 'add-leads-error',
                    position: 'top-right',
                    title: "new state leads",
                    color: 'secondary',
                })
                refechPipeline(get(valueUserPipeline, ['currentStatus', 'statusId'], 0), valueSelect)
                // onclouse
                onClose()
            },
        },
    });



    const changeStateLead = () => {
        const { agentId, comments, id } = valueUserPipeline
        comment_user_lead({
            variables: {
                agentId,
                statusId: valueSelect,
                userLeadId: id,
                comments
            },
        });
    }


    return (
        <>
            <Text color="primary" style={{ margin: '0px' }} component='h3'>Data Leads</Text>
            <Group grow>
                <Text component='span'>Current state</Text>
                <ChipStatusLead
                status={valueUserPipeline?.currentStatus?.name} />
            </Group>

            <Group grow>
                <Text component='span'>Lead</Text>
                <Text component='span'>{valueUserPipeline?.firstName} {valueUserPipeline?.lastName}</Text>
            </Group>

            <Text color="primary" style={{ margin: '0px' }} component='h3'>Change lead state</Text>
            <Box>
                <Text component='span'>New State</Text>
                <SelectStateLeads
                    disabled={isLoading}
                    placeholder='Select new state'
                    value={valueSelect}
                    onChange={(idState) => setvalueSelect(idState)}
                />
            </Box>
            <Box>
                <Text component='span'>Comment</Text>
                <Textarea
                    placeholder="Your Comment"
                    label={null}
                />
            </Box>

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
        </>
    )
}

export default BodyModal