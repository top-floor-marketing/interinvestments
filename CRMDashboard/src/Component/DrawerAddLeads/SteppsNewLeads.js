import React, { useState } from 'react'
// mantine
import { Stepper, Box, createStyles, Group, Button, Text, Badge } from '@mantine/core';
// import { useMediaQuery } from '@mantine/hooks';
//  icons
import { FileInfo, AddressBook, User, Check, X, ChevronLeft, ChevronRight } from 'tabler-icons-react';

// components
import ContainerStep from './ContainerStep'
import { LeadsInfo } from './Steps'

const useStyles = createStyles((theme, _params) => {
    return (
        {
            StepperContainer: {
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            },
            Stepper: {
                borderRadius: '50px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                '.mantine-Stepper-content': {
                    paddingTop: '0px',
                    width: '100%'
                },
            },
            steps: {
                width: '65%',
                marginLeft: 'auto',
                marginRight: '8px',
                [`${theme.fn.smallerThan("sm")}`]: {
                    margin: '0px',
                    width: '100%'
                }
            },
            titleStep: {
                fontWeight: 700,
                color: theme.colors.gray[6]
            },
            containerDescriptionStep: {
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                alignItems: 'start'
            },
            descriptionStep: {
                fontWeight: 700,
                fontSize: '15px'
            },
            stepsIcon: {
                '.mantine-Stepper-stepIcon': {
                    borderRadius: '65px',
                    '&[data-progress]': {
                        backgroundColor: theme.colors.white[0],
                        'svg': {
                            backgroundColor: theme.colors[_params.color],
                        }
                    },
                    '&[data-completed]': {
                        backgroundColor: `${theme.colors.white[0]} !important`,
                        borderColor: `${theme.colors.primary[9]} !important`,
                        'svg': {
                            backgroundColor: theme.colors.primary[9],
                        }
                    }
                }
            },
            icon: {
                'svg': {
                    borderRadius: '50px',
                    padding: '5px',
                }
            },
            boxTitle: {
                position: 'absolute',
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: theme.other.spacing.p2,
                top: '15%',
                [`${theme.fn.smallerThan("sm")}`]: {
                    position: 'relative',
                    marginBottom: '10px'
                }
            },
            GroupControllers: {
                alignContent: 'flex-end',
                height: '100%',
                marginBottom: '40px',
                'Button': {
                    backgroundColor: theme.colors.white[0],
                    '&:hover': {
                        backgroundColor: theme.colors.primary[9],
                        color: theme.colors.white
                    }
                }
            },
            CancelButton: {
                backgroundColor: `${theme.colors.error[6]} !important`,
                borderColor: `${theme.colors.error[6]} !important`,
                color: theme.colors.white[0],
                '&:hover': {
                    backgroundColor: `${theme.colors.error[3]} !important`,
                    borderColor: `${theme.colors.error[3]} !important`,
                }
            },
            ButtonSteps: {
                backgroundColor: `${theme.colors.black[0]} !important`,
                borderColor: `${theme.colors.black[0]} !important`,
                color: theme.colors.white[0],
                '&:hover': {
                    backgroundColor: `${theme.colors.gray[9]} !important`,
                    color: `${theme.colors.black[0]} !important`,
                    borderColor: `${theme.colors.gray[3]} !important`,
                }
            },
            BadgeSteps: {
                color: `${theme.colors.black[0]}`,
                backgroundColor: `${theme.colors.gray[4]}`,
                fontSize: '12px',
                'span': {
                    paddingLeft: '10px',
                    paddingRight: '10px'
                }
            },
            BadgeCompleted: {
                fontSize: '12px',
                'span': {
                    paddingLeft: '10px',
                    paddingRight: '10px'
                }
            }
        }
    )
});

const SteppsNewLeads = (_) => {
    const [activeStepper, setActiveStepper] = useState(0);
    const { classes } = useStyles({ color: 'secondary' });

    const nextStep = () => setActiveStepper((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActiveStepper((current) => (current > 0 ? current - 1 : current));

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
            active: activeStepper,
            onStepClick: setActiveStepper,
            // breakpoint: 'md'
        },
        Step: {
            label: null,
            description: null
        }
    }

    const BadgeStepsLabel = (position) => {
        if (activeStepper < position) {
            return 'Pending'
        }
        if (activeStepper === position) {
            return 'In Progress'
        }
        return 'Completed'
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
                                className={`${activeStepper <= 0 ? classes.BadgeSteps : classes.BadgeCompleted}`}
                                size="lg"
                                radius="lg"
                            >
                                {
                                    BadgeStepsLabel(0)
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
                                className={`${activeStepper <= 1 ? classes.BadgeSteps : classes.BadgeCompleted}`}
                                size="lg"
                                radius="lg"
                            >
                                {
                                    BadgeStepsLabel(1)
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
                    (activeStepper === 0) ? (
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