import React, { useState } from 'react'
// mantine
import { Stepper, Box, createStyles, Group, Button } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

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
        [`${theme.fn.smallerThan("md")}`]: {
            flexDirection: 'column',
        }
    },
    GroupControllers: {
        height: '20%'
    }
}));

const SteppsNewLeads = () => {
    const [activeStepper, setActiveStepper] = useState(1);
    const { classes } = useStyles();
    const matches = useMediaQuery('(min-width: 1024px)');

    const nextStep = () => setActiveStepper((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActiveStepper((current) => (current > 0 ? current - 1 : current));

    return (
        <Box className={classes.StepperContainer}>
            <Stepper
                className={classes.Stepper}
                active={activeStepper}
                onStepClick={setActiveStepper}
                orientation={(matches) ? 'vertical' : 'horizontal'}
            // breakpoint="sm"
            >
                <Stepper.Step label="Step 1" description="Create an account" >
                    <p>Step 1</p>
                </Stepper.Step>
                <Stepper.Step label="Step 2" description="Verify email" >
                    <p>Step 2</p>
                </Stepper.Step>
                <Stepper.Step label="Step 3" description="Get full access" >
                    <p>Step 3</p>
                </Stepper.Step>
                <Stepper.Completed>
                    <p>Completed, click back button to get to previous step</p>
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