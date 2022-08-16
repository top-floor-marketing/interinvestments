import React, { useState } from 'react'
// mantine
import { Stepper, Box, createStyles, Group, Button } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
// components
import ContainerStep from './ContainerStep'
import { LeadsInfo } from './Steps'

const useStyles = createStyles((theme, _params) => ({
    StepperContainer: {
        height: '100%',
        width: '100%',
    },
    Stepper: {
        height: '80%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        gap: '24px',
        // [`${theme.fn.smallerThan("md")}`]: {
        //     flexDirection: 'column',
        // },
        '.mantine-Stepper-content': {
            paddingTop: '0px',
            width: '100%'
        }
    },
    GroupControllers: {
        height: '20%'
    }
}));

const SteppsNewLeads = (_) => {
    const [activeStepper, setActiveStepper] = useState(0);
    const { classes } = useStyles();
    const matches = useMediaQuery('(min-width: 1024px)');

    const nextStep = () => setActiveStepper((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActiveStepper((current) => (current > 0 ? current - 1 : current));

    const props = {
        Stepper: {
            className: classes.Stepper,
            active: activeStepper,
            onStepClick: setActiveStepper,
            orientation: 'vertical'
        },
        Step: {
            label: null,
            description: null
        }
    }

    return (
        <Box className={classes.StepperContainer}>
            <Stepper {...props.Stepper}>
                <Stepper.Step {...props.Step}>
                    <ContainerStep title='Leads info'>
                        <LeadsInfo />
                    </ContainerStep>
                </Stepper.Step>
                <Stepper.Step {...props.Step}>
                    <ContainerStep>
                        <p>Step 2</p>
                    </ContainerStep>
                </Stepper.Step>
                <Stepper.Step {...props.Step}>
                    <ContainerStep>
                        <p>Step 3</p>
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