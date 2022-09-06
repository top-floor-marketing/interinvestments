import React from 'react'
// components
import { notificationError, notificationSuccess } from "../../../Component/Notifications";
// mantine
import { Group, Button } from '@mantine/core';
//  icons
import { X, ChevronLeft, ChevronRight } from 'tabler-icons-react';
// global store
import useClientGlobalStore from '../../../GlobalStore/useClientGlobalStore'
// styles 
import useStyles from './styles'
// react-query
import { useMutationHelper } from '../../../GraphqlClient/useRequest';
import { MUTATION_LEADS_ADD } from '../../../GraphqlClient/leads.gql';

const GroupFooter = (_) => {
    const { classes } = useStyles({ color: 'secondary' });
    const { refForm, nextStep, onClose } = _
    // global store
    const { state: { addLeads, user }, actions: { setstepperActive, setLoadingLeads } } = useClientGlobalStore()
    const {
        stepperActive,
        serviceData,
        listingData,
        dataForm,
        stateLeads,
        noteLeads,
        typeLeads,
        loading
    } = addLeads
    const { id: idUser } = user.infoUser

    const prevStep = () => setstepperActive(stepperActive > 0 ? stepperActive - 1 : stepperActive);

    const validateNextStep = () => {
        if (stepperActive === 0) {
            if (!serviceData.length && !listingData.length) {
                return notificationError({
                    id: 'edit-agent-profile',
                    position: 'top-right',
                    title: "Error",
                    color: 'secondary',
                    message: 'Select Listing or Services'
                })
            } else {
                return nextStep()
            }
        }

        if (stepperActive === 1) {
            return refForm.current.click()
        } else {
            return nextStep()
        }
    }

    const { mutate: mutatio_leads_add } = useMutationHelper({
        name: "lead-listing-mutation",
        gql: MUTATION_LEADS_ADD,
        config: {
            onError: () => {
                // alert error
                notificationError({
                    id: 'add-leads-error',
                    position: 'top-right',
                    title: "Error",
                    color: 'secondary',
                    message: 'Error add leads'
                })
                // onclouse
                onClose()
            },
            onSuccess: () => {
                // alert sucess
                notificationSuccess({
                    id: 'add-leads-error',
                    position: 'top-right',
                    title: "sucess",
                    color: 'secondary',
                    message: 'aggregate leads successful'
                })
                // onclouse
                onClose()
            },
        },
    });

    const finalStepper = () => {
        const { firstName, lastName, otherEmail, phoneNumber, otherPhoneNumber, email } = dataForm
        const leadsData = {
            agentId: `${idUser}`,
            firstName,
            email,
            lastName,
            otherEmail: [`${otherEmail}`],
            otherPhone: [`${otherPhoneNumber}`],
            phone: `${phoneNumber}`,
            service: serviceData.map((value) => parseInt(value)),
            listingId: listingData.length ? listingData.map((lis) => lis.databaseId) : [],
            interested: "",
            idStatusUserLead: stateLeads,
            commentListing: (typeLeads === "LISTING") ? noteLeads : "",
            commentService: (typeLeads === "SERVICES") ? noteLeads : "",
            comments: "",
        }
        // console.log("leadsData", leadsData)
        mutatio_leads_add({
            variables: {
                input: { ...leadsData },
            },
        });
        setLoadingLeads(true)
    }


    return (
        <Group
            className={classes.GroupControllers}
            position='center'
            spacing="xl"
        >
            {
                (stepperActive === 0) ? (
                    <Button
                        leftIcon={<X />}
                        className={classes.CancelButton}
                        variant="outline"
                        disabled={loading}
                        onClick={() => onClose()}
                    >
                        Cancel
                    </Button>
                ) : (
                    <Button
                        leftIcon={<ChevronLeft />}
                        className={classes.ButtonSteps}
                        variant="outline"
                        disabled={loading}
                        onClick={prevStep}
                    >
                        Back
                    </Button>
                )
            }
            {
                stepperActive <= 2 ? (
                    <Button
                        type="submit"
                        rightIcon={<ChevronRight />}
                        className={classes.ButtonSteps}
                        onClick={() => validateNextStep()}
                        disabled={loading}
                        variant="outline"
                    >
                        Next step
                    </Button>
                ) : (
                    <Button
                        onClick={() => finalStepper()}
                        variant="outline"
                        className={classes.ButtonComplete}
                        disabled={loading}
                        loading={loading}
                    >
                        Complete leads
                    </Button>
                )
            }
        </Group>
    )
}

export default GroupFooter