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
    const { refForm, nextStep, onClose } = _
    const {
        state: { addLeads: { stepperActive } }, actions: { setstepperActive }
    } = useClientGlobalStore()


    const prevStep = () => setstepperActive(stepperActive > 0 ? stepperActive - 1 : stepperActive);


    const validateNextStep = () => {
        if (stepperActive === 1) {
            refForm.current.click()
        } else {
            nextStep()
        }
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
                        onClick={() => onClose()}
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
                stepperActive <= 2 ? (
                    <Button
                        type="submit"
                        rightIcon={<ChevronRight />}
                        className={classes.ButtonSteps}
                        onClick={() => validateNextStep()}
                        variant="outline"
                    >
                        Next step
                    </Button>
                ) : (
                    <Button
                        variant="outline"
                        className={classes.ButtonComplete}
                    >
                        Complete leads
                    </Button>
                )
            }
        </Group>
    )
}

export default GroupFooter