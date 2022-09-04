import React, { useState } from 'react'
// components
import SelectItem from './SelectItem'
// mantine
import { Select } from "@mantine/core";

import PropTypes from "prop-types";

// styles
import useStyles from './styles';

const DEFAULT_VALUE = '_default_';

const SelectStateLeads = ({ value, onChange }) => {
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

    const colorSelect = () => {
        switch (value) {
          case "not_contated":
            return classes.selectError;
          case "contated":
            return classes.selectPrimary;
          case "showing":
            return classes.selectSecondary;
          case "contract":
            return classes.selectSuccess;
          case "ask_referrals":
            return classes.selectInfo;
          default:
            return null;
        }
    }

    return (
      <Select
        className={classes.select}
        classNames={{
          input: `${classes.inputSelect} ${colorSelect()}`,
        }}
        value={value}
        onChange={onChange}
        placeholder="Select a lead state"
        itemComponent={SelectItem}
        data={data}
        maxDropdownHeight={600}
      />
    );
}

// Specifies the default values for props:
SelectStateLeads.defaultProps = {
  value: DEFAULT_VALUE,
  onChange: () => {}
};

SelectStateLeads.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default SelectStateLeads