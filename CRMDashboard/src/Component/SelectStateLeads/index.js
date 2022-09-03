import React, { useState } from 'react'
// components
import SelectItem from './SelectItem'
// mantine
import { Select } from "@mantine/core";

// styles
import useStyles from './styles'

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



    const onChangeSelect = (value) => {
        setvalueSelect(value)
    }

    const colorSelect = () => {
        switch (valueSelect) {
            case 'not_contated':
                return classes.selectError
            case 'contated':
                return classes.selectPrimary
            case 'showing':
                return classes.selectSecondary
            case 'contract':
                return classes.selectSuccess
            case 'ask_referrals':
                return classes.selectInfo
            default:
                return null
        }
    }

    return (
        <Select
            className={classes.select}
            classNames={{
                input: `${classes.inputSelect} ${colorSelect()}`
            }}
            value={valueSelect}
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