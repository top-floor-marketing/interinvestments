import React, { useState } from 'react'
// mantine
import { createStyles, Select, Group, Text, Box } from "@mantine/core";
// icon
import { UserExclamation, UserCheck, Building, FileCheck, ZoomExclamation } from 'tabler-icons-react';

const useStyles = createStyles((theme, _params, getRef) => ({
    inputSelect: {
        paddingLeft: '40px !important'
    }
}));


const SelectStateLeads = () => {
    const [valueSelect, setvalueSelect] = useState(null)
    const { classes } = useStyles();
    const data = [
        {
            label: 'Not Contated',
            value: 'not_contated',
            color: 'error',
        },
        {
            label: 'Contated',
            value: 'contated',
            color: 'primary',
        },
        {
            label: 'Showing',
            value: 'showing',
            color: 'secondary',
        },
        {
            label: 'Contract',
            value: 'contract',
            color: 'success',
        },
        {
            label: 'Ask Referrals',
            value: 'ask_referrals',
            color: 'info',
        },
    ];

    const SelectItem = ({ label, color, ...others }) => {
        return (
            <Box {...others}>
                <Group noWrap>
                    <Box>
                        <Text size="sm">{label}</Text>
                    </Box>
                </Group>
            </Box>
        )
    }


    const onChangeSelect = (value) => {
        setvalueSelect(value)
    }

    return (
        <Select
            value={valueSelect}
            classNames={{
                input: classes.inputSelect
            }}
            onChange={onChangeSelect}
            label={null}
            placeholder="Pick one"
            itemComponent={SelectItem}
            data={data}
            maxDropdownHeight={400}
            nothingFound="Nobody here"
        />
    )
}

export default SelectStateLeads