import React, { useCallback } from "react";
// components
import SelectItem from "./SelectItem";
// mantine
import { Select } from "@mantine/core";
import useClientGlobalStore from "../../GlobalStore/useClientGlobalStore";

import { PIPELINE_STATUS } from "../../GlobalStore/utils";

import PropTypes from "prop-types";

// styles
import useStyles from "./styles";

import findLast from "lodash/findLast";
import toLower from "lodash/toLower";
import get from "lodash/get";
import filter from 'lodash/filter';

const SelectStateLeads = ({
  value,
  onChange,
  disabled,
  placeholder,
  disabledList
}) => {
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
      case PIPELINE_STATUS.NOT_CONTACTED:
        return classes.selectError;
      case PIPELINE_STATUS.CONTACTED:
        return classes.selectPrimary;
      case PIPELINE_STATUS.SHOWING:
        return classes.selectSecondary;
      case PIPELINE_STATUS.CONTRACT:
        return classes.selectSuccess;
      case PIPELINE_STATUS.ASK_REFERRALS:
        return classes.selectInfo;
      default:
        return classes.placeholder;
    }
  }, [classes, listStatus, value]);

  const getColorItem = useCallback((label) => {
    switch (toLower(label)) {
      case PIPELINE_STATUS.NOT_CONTACTED:
        return "error";
      case PIPELINE_STATUS.CONTACTED:
        return "primary";
      case PIPELINE_STATUS.SHOWING:
        return "secondary";
      case PIPELINE_STATUS.CONTRACT:
        return "success";
      case PIPELINE_STATUS.ASK_REFERRALS:
        return "info";
      default:
        return "";
    }
  }, []);

  const getFinalItems = useCallback(() => {
    if(!disabledList.length) return listStatus;
    return filter(listStatus, (val) => val.value !== disabledList[0]);
  },[listStatus, disabledList]);

  return (
    <Select
      className={classes.select}
      classNames={{
        input: cx(colorSelect()),
      }}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      itemComponent={(itemProps) => {
        const colorItem = getColorItem(itemProps.label);
        return <SelectItem {...itemProps} color={colorItem} />;
      }}
      data={getFinalItems()}
      maxDropdownHeight={600}
      disabled={disabled}
      searchable={false}
      clearable 
      nothingFound="No options"
    />
  );
};

// Specifies the default values for props:
SelectStateLeads.defaultProps = {
  value: null,
  onChange: () => {},
  disabled: false,
  placeholder: "Lead State",
  isFilter: false,
  disabledList: []
};

SelectStateLeads.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  isFilter: PropTypes.bool,
  disabledList: PropTypes.array
};

export default SelectStateLeads;
