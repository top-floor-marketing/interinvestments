import React from 'react'
// mantine
import { Select, createStyles, Text } from "@mantine/core";
// icon
import { ChevronDown } from 'tabler-icons-react';

const useStyles = createStyles((theme, _params) => ({
    containerBadgeSelect: {
        width: "100%"
    },
    textInput: {
        color: theme.colors.white[0],
        fontSize: '18px',
        fontWeight: '400'
    },
    input: {
        background: theme.colors.primary[4],
        paddingLeft: '90px !important',
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
        <Select
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
            placeholder={null}
        />
    )
}

export default BadgeSelect