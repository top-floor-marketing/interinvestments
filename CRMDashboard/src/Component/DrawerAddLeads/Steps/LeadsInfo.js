import React, { useState } from 'react'
// components
import SelectUserLead from '../../../Component/SelectUserLead'
import SelectAgent from './SelectAgent'
// mantine
import { TextInput, Divider, Box } from '@mantine/core';
// icons
import { User, Mail, Phone } from 'tabler-icons-react';
// styles
import useStyles from './styles'
// react query
import { useQueryHelper } from "../../../GraphqlClient/useRequest";
import { GET_USER_LEADS_FOR_WIZARD } from "../../../GraphqlClient/leads.gql";
//  utils
import get from 'lodash/get'
import { USER_ROLES_CRM } from '../../../GlobalStore/utils'
// global store
import useClientGlobalStore from "../../../GlobalStore/useClientGlobalStore";

const LeadsInfo = ({ form, onSubmitForm, refForm }) => {
    const [dataSelectUserLeads, setDataselectUserLeads] = useState([])

    const { classes } = useStyles();
    // global store
    const { state } = useClientGlobalStore();
    const { user: { infoUser: { databaseId, agentType } } } = state

    // console.log('addLeads', addLeads)

    const { isLoading, isError } = useQueryHelper({
        name: "get-user-leads-for-wizard",
        gql: GET_USER_LEADS_FOR_WIZARD,
        config: {
            onSuccess: (response) => {
                setDataselectUserLeads(get(response, ['dataAgent', '0', 'statuses'], []).map((user) => user?.userLead))
            },
            onerror: () => {
                setDataselectUserLeads([])
            }
        },
        variables: {
            agentId: databaseId,
            agentType: agentType,
        },
    });

    const onchangeSelectUserLeads = (user) => {
        const { firstName, lastName, email, phone, otherPhones, otherEmails } = user
        form.setValues({
            firstName,
            lastName,
            email,
            phoneNumber: phone,
            otherEmail: otherEmails[0],
            otherPhoneNumber: otherPhones
        })
    }


    return (
        <>
            <Box
                style={{ marginTop: '1rem', marginBottom: '1rem' }}
                className={classes.containerMain}
            >
                <SelectUserLead
                    labelSelect="Select a existing lead"
                    placeholder='lead Name...'
                    isLoading={isLoading}
                    isError={isError}
                    data={dataSelectUserLeads}
                    onChange={(val) => onchangeSelectUserLeads(val)}
                />
                {
                    agentType === USER_ROLES_CRM.ADMIN ? (
                        <SelectAgent  />
                    ) : null
                }
            </Box>
            <Divider my="sm" />
            <form
                onSubmit={form.onSubmit((values) => onSubmitForm(values))}
                className={classes.containerMain}
            >
                <TextInput
                    {...form.getInputProps("firstName")}
                    className={classes.input}
                    placeholder={null}
                    label="First Name"
                    icon={<User />}
                />
                <TextInput
                    {...form.getInputProps("lastName")}
                    className={classes.input}
                    placeholder={null}
                    label="Last Name"
                    icon={<User />}
                />
                <TextInput
                    {...form.getInputProps("email")}
                    className={classes.input}
                    placeholder={null}
                    label="Email client"
                    icon={<Mail />}
                />
                <TextInput
                    {...form.getInputProps("phoneNumber")}
                    className={classes.input}
                    classNames={{
                        input: classes.NumberInput,
                        control: classes.controllNumberInput
                    }}
                    placeholder={null}
                    label="Phone Number"
                    icon={<Phone />}
                />

                <Divider
                    my="xs"
                    label="Optional info"
                    className={`${classes.title} ${classes.inputFull}`}
                />

                <TextInput
                    {...form.getInputProps("otherEmail")}
                    className={classes.input}
                    placeholder={null}
                    label="Other Email"
                    icon={<Mail />}
                />
                <TextInput
                    {...form.getInputProps("otherPhoneNumber")}
                    className={classes.input}
                    classNames={{
                        input: classes.NumberInput,
                        control: classes.controllNumberInput
                    }}
                    placeholder={null}
                    label="Other Phone"
                    icon={<Phone />}
                />
                <button
                    style={{ display: 'none' }}
                    type="submit"
                    ref={refForm}
                />
            </form>
        </>
    )
}

export default LeadsInfo