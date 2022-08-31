import React from 'react'
// mantine
import { Group, Button } from '@mantine/core';
//  icons
import { X, ChevronLeft, ChevronRight } from 'tabler-icons-react';
// global store
import useClientGlobalStore from '../../../GlobalStore/useClientGlobalStore'
// styles 
import useStyles from './styles'

const GroupFooter = (_) => {
    const { classes } = useStyles({ color: 'secondary' });
    const {
        state: { addLeads: { stepperActive } }, actions: { setstepperActive }
    } = useClientGlobalStore()

    const nextStep = () => setstepperActive(stepperActive < 3 ? stepperActive + 1 : stepperActive);
    const prevStep = () => setstepperActive(stepperActive > 0 ? stepperActive - 1 : stepperActive);

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
            {
                stepperActive <= 2 && (
                    <Button
                        rightIcon={<ChevronRight />}
                        className={classes.ButtonSteps}
                        onClick={nextStep}
                        variant="outline"
                    >
                        Next step
                    </Button>
                )
            }
        </Group>
    )
}

export default GroupFooter