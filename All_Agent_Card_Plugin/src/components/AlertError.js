import React from 'react'

// mantine
import { Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';

const AlertError = (props) => {

    const {
        label = 'Error!',
        description = 'Something terrible happened! You made a mistake and there is no going back, your data was lost forever!'
    } = props

    return (
        <Alert icon={<IconAlertCircle size={16} />} title={label} color="red" radius="md" variant="filled">
            {description}
        </Alert>
    )
}

export default AlertError