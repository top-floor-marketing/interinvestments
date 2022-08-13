import React, { useRef } from 'react'
// components
import IconSelect from './IconSelect'
import ChevronIcon from './ChevronIcon'
// utils
import PropTypes from 'prop-types';
// mantine
import { Select } from "@mantine/core";
// styles
import useStyles from './stylesBadgeS'

const BadgeSelect = ({ Icon, data }) => {
    const { classes } = useStyles();

    const refSelect = useRef(null)

    return (
        <Select
            icon={<Icon />}
            ref={refSelect}
            rightSection={<ChevronIcon refProps={refSelect} />}
            className={classes.containerBadgeSelect}
            classNames={{
                input: `${classes.input} ${classes.textInput}`,
                icon: classes.iconSection
            }}
            data={data}
            placeholder={null}
        />
    )
}


// Specifies the default values for props:
BadgeSelect.defaultProps = {
    Icon: IconSelect,
    data: ['React', 'Vue', 'Angular', 'Svelte']
};

BadgeSelect.propTypes = {
    Icon: PropTypes.element,
    data: PropTypes.array
};

export default BadgeSelect