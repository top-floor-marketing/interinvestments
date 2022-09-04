import React, { useCallback } from "react";
// components
import SelectItem from "./SelectItem";
// mantine
import { Select } from "@mantine/core";

import useClientGlobalStore from "../../GlobalStore/useClientGlobalStore";

import PropTypes from "prop-types";

// styles
import useStyles from "./styles";

import findLast from "lodash/findLast";
import toLower from "lodash/toLower";
import get from "lodash/get";

const SelectStateLeads = ({ value, onChange, disabled }) => {
  const { cx, classes } = useStyles({ value });

  const {
    state: {
      global: { statusUserLead: listStatus },
    },
  } = useClientGlobalStore();

  const colorSelect = useCallback(() => {
    const nameSelected = get(
      findLast(listStatus, (val) => val.value === value),
      ["label"],
      ""
    );
    switch (toLower(nameSelected)) {
      case "not contacted":
        return classes.selectError;
      case "contacted":
        return classes.selectPrimary;
      case "showing":
        return classes.selectSecondary;
      case "contract":
        return classes.selectSuccess;
      case "ask referrals":
        return classes.selectInfo;
      default:
        return classes.placeholder;
    }
  }, [classes, listStatus, value]);

  const getColorItem = useCallback((label) => {
    switch (toLower(label)) {
      case "not contacted":
        return "error";
      case "contacted":
        return "primary";
      case "showing":
        return "secondary";
      case "contract":
        return "success";
      case "ask referrals":
        return "info";
      default:
        return "";
    }
  }, []);

  return (
    <Select
      className={classes.select}
      classNames={{
        input: cx(colorSelect()),
      }}
      value={value}
      onChange={onChange}
      placeholder="State of the lead"
      itemComponent={(itemProps) => {
        const colorItem = getColorItem(itemProps.label);
        return <SelectItem {...itemProps} color={colorItem} />;
      }}
      data={listStatus}
      maxDropdownHeight={600}
      disabled={disabled}
    />
  );
};

// Specifies the default values for props:
SelectStateLeads.defaultProps = {
  value: null,
  onChange: () => {},
  disabled: false,
};

SelectStateLeads.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  disabled: PropTypes.bool
};

export default SelectStateLeads;
