import React, { useRef } from 'react'
// mantine
import { Stepper, Box, Text } from '@mantine/core';
import { useForm } from "@mantine/form";
//  icons
import { User, Check, BuildingCommunity, Note } from 'tabler-icons-react';
// components
import ContainerStep from '../ContainerStep'
import GroupFooter from './GroupFooter'
import DescriptionSteps from './DescriptionSteps'
import { ListingLeadsInfo, TypeLeads, FinalStepp, CommentLeads } from '../Steps'
import { firstNameValidation, emailValidation, phoneNumberValidation, lastNameValidation } from '../Steps/ValidationForm'
// global store
import useClientGlobalStore from '../../../GlobalStore/useClientGlobalStore'
// styles 
import useStyles from './styles'

const SteppsNewLeads = (_) => {
    const {
        state: { addLeads: { stepperActive } },
        actions: { setstepperActive, setDataForm }
    } = useClientGlobalStore()
    // const { state: { addLeads } } = useClientGlobalStore()
    const { classes } = useStyles({ color: 'secondary' });
    const refForm = useRef(null)
    const props = {
        Stepper: {
            className: classes.Stepper,
            iconSize: 52,
            size: "md",
            classNames: {
                steps: classes.steps,
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
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: null,
            otherEmail: "",
            otherPhoneNumber: ""
        },
        validate: (values) => ({
            firstName: firstNameValidation(values.firstName),
            lastName: lastNameValidation(values.lastName),
            email: emailValidation(values.email),
            phoneNumber: phoneNumberValidation(values.phoneNumber),
            // note: noteValidation(values.note),
        }),
    });

    const nextStep = () => setstepperActive(stepperActive < 3 ? stepperActive + 1 : stepperActive);

    const onSubmitForm = (valueForm) => {
        // dispach
        setDataForm({ ...valueForm })
        nextStep()
    };


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
                    <ContainerStep title={null}>
                        <ListingLeadsInfo
                            refForm={refForm}
                            form={form}
                            onSubmitForm={onSubmitForm}
                        />
                    </ContainerStep>
                </Stepper.Step>

                <Stepper.Step
                    {...props.Step}
                    icon={<Note size={34} color='white' />}
                    label={<Text component="span" className={classes.titleStep}>Step 3</Text>}
                    description={
                        <DescriptionSteps
                            stepperActive={stepperActive}
                            position={2}
                            text='Overview'
                        />
                    }
                >
                    <ContainerStep title={null}>
                        <CommentLeads />
                    </ContainerStep>
                </Stepper.Step>

                <Stepper.Completed>
                    <ContainerStep title={null}>
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