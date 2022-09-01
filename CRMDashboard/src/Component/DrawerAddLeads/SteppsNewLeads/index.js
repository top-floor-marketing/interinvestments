import React, { useRef } from 'react'
// mantine
import { Stepper, Box, Text } from '@mantine/core';
import { useForm } from "@mantine/form";
//  icons
import { FileInfo, User, Check, BuildingCommunity } from 'tabler-icons-react';
// components
import ContainerStep from '../ContainerStep'
import GroupFooter from './GroupFooter'
import DescriptionSteps from './DescriptionSteps'
import { ListingLeadsInfo, TypeLeads, InterestedListing, FinalStepp } from '../Steps'
import { nameLeadsValidation, emailValidation, phoneNumberValidation, noteValidation } from '../Steps/ValidationForm'
// import Schema from '../Steps/ShemaLeadForm'
// global store
import useClientGlobalStore from '../../../GlobalStore/useClientGlobalStore'
// styles 
import useStyles from './styles'

const SteppsNewLeads = (_) => {
    const { state: { addLeads: { stepperActive, typeLeads } }, actions: { setstepperActive } } = useClientGlobalStore()
    // const { state: { addLeads } } = useClientGlobalStore()
    const { classes } = useStyles({ color: 'secondary' });
    const refForm = useRef(null)
    const props = {
        Stepper: {
            className: classes.Stepper,
            iconSize: 52,
            size: "md",
            classNames: {
                //  steps: classes.steps,
                stepIcon: classes.icon,
                stepWrapper: classes.stepsIcon
            },
            active: stepperActive
        },
        Step: {
            color: 'secondary',
            completedIcon: (
                <Check size={34} color='white' />
            )
        }
    }

    const form = useForm({
        // schema: joiResolver(Schema),
        validateInputOnChange: true,
        initialValues: {
            nameLeads: "",
            email: "",
            phoneNumber: null,
            note: "",
            otherNameLeads: "",
            otherEmail: "",
            otherPhoneNumber: ""
        },
        validate: (values) => ({
            nameLeads: nameLeadsValidation(values.nameLeads),
            email: emailValidation(values.email),
            phoneNumber: phoneNumberValidation(values.phoneNumber),
            note: noteValidation(values.note),
        }),
    });

    const nextStep = () => setstepperActive(stepperActive < 3 ? stepperActive + 1 : stepperActive);

    const onSubmitForm = (valueForm) => {
        // dispach
        console.log('onSubmitForm', valueForm)
        nextStep()
    };


    // console.log('addLeads Store', addLeads)

    return (
        <Box className={classes.StepperContainer}>
            <Stepper {...props.Stepper}>
                <Stepper.Step
                    {...props.Step}
                    icon={<BuildingCommunity size={34} color='white' />}
                    label={<Text component="span" className={classes.titleStep}>Step 1</Text>}
                    description={
                        <DescriptionSteps
                            stepperActive={stepperActive}
                            position={0}
                            text='Select leads type'
                        />
                    }
                >
                    <ContainerStep title={null}>
                        <TypeLeads />
                    </ContainerStep>
                </Stepper.Step>

                <Stepper.Step
                    {...props.Step}
                    icon={<User size={34} color='white' />}
                    label={<Text component="span" className={classes.titleStep}>Step 2</Text>}
                    description={
                        <DescriptionSteps
                            stepperActive={stepperActive}
                            position={1}
                            text='Leads info'
                        />
                    }
                >
                    <ContainerStep title='Leads info'>
                        <ListingLeadsInfo
                            refForm={refForm}
                            form={form}
                            onSubmitForm={onSubmitForm}
                        />
                    </ContainerStep>
                </Stepper.Step>

                <Stepper.Step
                    {...props.Step}
                    icon={<FileInfo size={34} color='white' />}
                    label={<Text component="span" className={classes.titleStep}>Step 3</Text>}
                    description={
                        <DescriptionSteps
                            stepperActive={stepperActive}
                            position={2}
                            text='Interested in'
                        />
                    }
                >
                    <ContainerStep title={null}>
                        {
                            (typeLeads) === "LISTING" ? (
                                <InterestedListing />
                            ) : (
                                <p>fcsafsafasfd</p>
                            )
                        }
                    </ContainerStep>
                </Stepper.Step>

                <Stepper.Completed>
                    <ContainerStep>
                        <FinalStepp />
                    </ContainerStep>
                </Stepper.Completed>
            </Stepper>
            <GroupFooter
                nextStep={nextStep}
                onClose={_.onClose}
                refForm={refForm}
            />
        </Box>
    )
}

export default SteppsNewLeads