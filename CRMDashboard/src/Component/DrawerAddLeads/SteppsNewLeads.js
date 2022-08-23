import React, { useState } from 'react'
// mantine
import { Stepper, Box, createStyles, Group, Button, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
//  icons
import { FileInfo, AddressBook, User, Check } from 'tabler-icons-react';
// components
import ContainerStep from './ContainerStep'
import { LeadsInfo } from './Steps'

const useStyles = createStyles((theme, _params) => {
    return (
        {
            StepperContainer: {
                height: '100%',
                width: '100%',
            },
            Stepper: {
                borderRadius: '50px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                // [`${theme.fn.smallerThan("md")}`]: {
                //     flexDirection: 'row',
                // },
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
                    // '.mantine-Stepper-step': {
                    //     flexDirection: 'column',
                    //     gap: '5px',
                    //     alignItems: 'start'
                    // }
                },
            },
            titleStep: {
                fontWeight: 700,
                color: theme.colors.gray[6]
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
                [`${theme.fn.smallerThan("sm")}`]: {
                    position: 'relative',
                    marginBottom: '10px'
                },
            },
            GroupControllers: {
                height: '20%',
                'Button': {
                    backgroundColor: theme.colors.white[0],
                    '&:hover': {
                        backgroundColor: theme.colors.primary[9],
                        color: theme.colors.white
                    }
                }
            }
        }
    )
});

const SteppsNewLeads = (_) => {
    const [activeStepper, setActiveStepper] = useState(0);
    const { classes } = useStyles({ color: 'secondary' });
    const matches = useMediaQuery('(min-width: 1024px)');

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

    return (
        <Box className={classes.StepperContainer}>
            <Box className={classes.boxTitle}>
                <AddressBook size={20} />
                <Text component="h1" className={classes.titleModal}>
                    {_.title}
                </Text>
            </Box>
            <Stepper {...props.Stepper}>
                <Stepper.Step
                    color={'secondary'}
                    icon={<User size={34} color='white' />}
                    completedIcon={<Check size={34} color='white' />}
                    label={<Text component="span" className={classes.titleStep}>Step 1</Text>}
                    description={<Text component="span" className={classes.descriptionStep}>Personal info</Text>}
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
                    description={<Text component="span" className={classes.descriptionStep}>Interested in</Text>}
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
                position={(matches) ? 'apart' : 'center'}
                spacing="xl"
            >
                <Button variant="outline" onClick={prevStep}>
                    Back
                </Button>
                <Button onClick={nextStep} variant="outline">
                    Next step
                </Button>
            </Group>
        </Box>
    )
}

export default SteppsNewLeads