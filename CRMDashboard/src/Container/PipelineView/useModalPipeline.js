import React, { useState } from 'react'
// components
import SelectStateLeads from '../../Component/SelectStateLeads'
// mantine
import { createStyles } from '@mantine/core';
import { TextInput, Box } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';

const useStyles = createStyles((theme, _params) => {
    return {
        modalBody: {
            display: "flex",
            flexDirection: 'column',
            gap: theme.other.spacing.p4,
        }
    }
});

const useModalPipeline = () => {
    const [valueSelect, setvalueSelect] = useState(null)
    const { classes } = useStyles()

    const openModal = () => openConfirmModal({
        title: 'Lorem ipsum dolor sit amet,',
        children: (
            <Box className={classes.modalBody}>
                <SelectStateLeads
                    value={valueSelect}
                    onChange={(idState) => setvalueSelect(idState)}
                />
                <TextInput
                    placeholder="Your name"
                    label="Full name"
                />
            </Box>
        ),
        labels: { confirm: 'Confirm', cancel: 'Cancel' },
        onCancel: () => console.log('Cancel'),
        onConfirm: () => console.log('Confirmed'),
    });

    return {
        openModal
    }
}

export default useModalPipeline