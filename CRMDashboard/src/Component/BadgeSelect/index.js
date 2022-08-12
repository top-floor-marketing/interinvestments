import React from 'react'
// mantine
import { NativeSelect, createStyles, Text } from "@mantine/core";
// icon
import { ChevronDown } from 'tabler-icons-react';

const useStyles = createStyles((theme, _params) => ({
    containerBadgeSelect: {
        width: "100%",
    },
    textInput: {
        color: 'white',
        fontSize: '18px',
        fontWeight: '400'
    },
    input: {
        background: theme.colors.blue[4],
        paddingLeft: '93px !important',
        border: 'none',
        fontWeight: '700 !important',
        textAling: 'left'
    },
    iconSection: {
        width: '40%',
        display: 'flex',
        paddingLeft: '10px !important',
        justifyContent: 'flex-start'
    }
}));

const BadgeSelect = () => {
    const { classes } = useStyles();
    return (
        <NativeSelect
            icon={
                <Text
                    className={classes.textInput}
                    component='span'
                >
                    Filters by:
                </Text>
            }
            rightSection={
                <ChevronDown color='white' size={14} />
            }
            className={classes.containerBadgeSelect}
            classNames={{
                input: `${classes.input} ${classes.textInput}`,
                icon: classes.iconSection
            }}
            data={['React', 'Vue', 'Angular', 'Svelte']}
            placeholder="Pick one"
        />
    )
}

export default BadgeSelect