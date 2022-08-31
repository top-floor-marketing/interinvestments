import React from 'react'
// mantine
import { Stepper, Box, Text } from '@mantine/core';
//  icons
import { FileInfo, User, Check } from 'tabler-icons-react';
// components
import ContainerStep from '../ContainerStep'
import GroupFooter from './GroupFooter'
import DescriptionSteps from './DescriptionSteps'
import { ListingLeadsInfo, TypeLeads, InterestedListing } from '../Steps'
// global store
import useClientGlobalStore from '../../../GlobalStore/useClientGlobalStore'
// styles 
import useStyles from './styles'

const SteppsNewLeads = (_) => {
    const { state: { addLeads: { stepperActive, typeLeads } } } = useClientGlobalStore()
    const { state: { addLeads } } = useClientGlobalStore()
    const { classes } = useStyles({ color: 'secondary' });

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
            label: null,
            description: null
        }
    }


    console.log('addLeads Store', addLeads)



    return (
        <Box className={classes.StepperContainer}>
            <Stepper {...props.Stepper}>
                <Stepper.Step
                    color={'secondary'}
                    icon={<User size={34} color='white' />}
                    completedIcon={<Check size={34} color='white' />}
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
                    color={'secondary'}
                    icon={<User size={34} color='white' />}
                    completedIcon={<Check size={34} color='white' />}
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
                        <ListingLeadsInfo />
                    </ContainerStep>
                </Stepper.Step>

                <Stepper.Step
                    color={'secondary'}
                    icon={<FileInfo size={34} color='white' />}
                    completedIcon={<Check size={34} color='white' />}
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
                        <p>Completed, click back button to get to previous step</p>
                    </ContainerStep>
                </Stepper.Completed>
            </Stepper>
            <GroupFooter onClose={_.onClose} />
        </Box>
    )
}

export default SteppsNewLeads