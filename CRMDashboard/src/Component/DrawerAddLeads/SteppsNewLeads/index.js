import React from 'react'
// mantine
import { Stepper, Box, Group, Button, Text, Badge } from '@mantine/core';
//  icons
import { FileInfo, AddressBook, User, Check, X, ChevronLeft, ChevronRight } from 'tabler-icons-react';
// components
import ContainerStep from '../ContainerStep'
import { LeadsInfo } from '../Steps'
// global store
import useClientGlobalStore from '../../../GlobalStore/useClientGlobalStore'
// styles 
import useStyles from './styles'


const SteppsNewLeads = (_) => {
    const { state: { addLeads: { stepperActive } }, actions: { setstepperActive } } = useClientGlobalStore()
    const { classes } = useStyles({ color: 'secondary' });

    const nextStep = () => setstepperActive(stepperActive < 2 ? stepperActive + 1 : stepperActive);
    const prevStep = () => setstepperActive(stepperActive > 0 ? stepperActive - 1 : stepperActive);

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
            label: null,
            description: null
        }
    }

    const BadgeStepsLabel = (position) => {
        if (stepperActive < position) {
            return ({
                classBadge: classes.BadgeSteps,
                label: 'Pending'
            })
        }
        if (stepperActive === position) {
            return ({
                classBadge: classes.BadgeInProgress,
                label: 'In Progress'
            })
        }
        return ({
            classBadge: classes.BadgeCompleted,
            label: 'Completed'
        })
    }


    return (
        <Box className={classes.StepperContainer}>
            <Box className={classes.boxTitle}>
                <AddressBook size={20} />
                <Text component="h1">
                    {_.title}
                </Text>
            </Box>
            <Stepper {...props.Stepper}>
                <Stepper.Step
                    color={'secondary'}
                    icon={<User size={34} color='white' />}
                    completedIcon={<Check size={34} color='white' />}
                    label={<Text component="span" className={classes.titleStep}>Step 1</Text>}
                    description={
                        <Box className={classes.containerDescriptionStep}>
                            <Text component="span" className={classes.descriptionStep}>Personal info</Text>
                            <Badge
                                className={`${BadgeStepsLabel(0).classBadge}`}
                                size="lg"
                                radius="lg"
                            >
                                {
                                    BadgeStepsLabel(0).label
                                }

                            </Badge>
                        </Box>
                    }
                >
                    <ContainerStep title='Leads info'>
                        <LeadsInfo />
                    </ContainerStep>
                </Stepper.Step>

                <Stepper.Step
                    color={'secondary'}
                    icon={<FileInfo size={34} color='white' />}
                    completedIcon={<Check size={34} color='white' />}
                    label={<Text component="span" className={classes.titleStep}>Step 2</Text>}
                    description={
                        <Box className={classes.containerDescriptionStep}>
                            <Text component="span" className={classes.descriptionStep}>Interested in</Text>
                            <Badge
                                className={`${BadgeStepsLabel(1).classBadge}`}
                                size="lg"
                                radius="lg"
                            >
                                {
                                    BadgeStepsLabel(1).label
                                }
                            </Badge>
                        </Box>
                    }
                >
                    <ContainerStep>
                        <p>Step 2</p>
                    </ContainerStep>
                </Stepper.Step>

                <Stepper.Completed>
                    <ContainerStep>
                        <p>Completed, click back button to get to previous step</p>
                    </ContainerStep>
                </Stepper.Completed>
            </Stepper>
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
                            onClick={() => _.onClose()}
                        >
                            Cancel
                        </Button>
                    ) : (
                        <Button
                            leftIcon={<ChevronLeft />}
                            className={classes.ButtonSteps}
                            variant="outline"
                            onClick={prevStep}
                        >
                            Back
                        </Button>
                    )
                }
                <Button
                    rightIcon={<ChevronRight />}
                    className={classes.ButtonSteps}
                    onClick={nextStep}
                    variant="outline"
                >
                    Next step
                </Button>
            </Group>
        </Box >
    )
}

export default SteppsNewLeads