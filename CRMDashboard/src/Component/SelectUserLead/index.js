import React from 'react'
// mantine
import { Box, Text, Select, Group, createStyles, Loader } from '@mantine/core';
import { User, Mail } from 'tabler-icons-react';
// ustils
import filterlodash from 'lodash/filter'

const useStyles = createStyles((theme, _params, getRef) => ({
    textdropdown: {
        marginTop: '5px',
        marginBottom: '5px'
    },
}));

const SelectUserLead = ({ value, data, isLoading, isError, onChange: onChangeSelect }) => {
    const { classes } = useStyles();

    const SelectItem = (props) => {
        const { label, email, ...others } = props
        return (
            <Box {...others}>
                <Group spacing="sm">
                    <User />
                    <Text className={classes.textdropdown} component='h3'>{label}</Text>
                </Group>
                <Group spacing="sm">
                    <Mail />
                    <Text size="xs">
                        {email}
                    </Text>
                </Group>
            </Box>
        )
    }


    const formatData = () => {
        const newData = data.map(item => {
            return {
                ...item,
                value: item.id,
                label: `${item.firstName} ${item.lastName}`
            }
        })
        return newData
    }

    const filterUserLeads = (idValue) => {
        onChangeSelect(filterlodash(data, { id: idValue })[0])
    }


    return (
        <Select
            clearable
            value={value}
            disabled={isLoading || isError}
            label="Select user exist"
            placeholder="Serach user"
            onChange={(value) => filterUserLeads(value)}
            itemComponent={SelectItem}
            data={formatData()}
            rightSection={isLoading ? <Loader size={14} /> : null}
            searchable
            maxDropdownHeight={400}
            nothingFound="Nobody here"
            filter={(value, item) =>
                item.label.toLowerCase().includes(value.toLowerCase().trim()) ||
                item.email.toLowerCase().includes(value.toLowerCase().trim())
            }
        />
    )
}





export default SelectUserLead