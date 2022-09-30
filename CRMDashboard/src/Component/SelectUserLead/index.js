import PropTypes from "prop-types"
import React from 'react'
// components
import SelectItem from './SelectItem';
// mantine
import { Select, Loader } from "@mantine/core";
// ustils
import filterlodash from 'lodash/filter';
// styles
import useStyles from './styles';

import omit from 'lodash/omit';

const SelectUserLead = (props) => {
  const {
    labelSelect,
    typeDropdow,
    value,
    data,
    isLoading,
    isError,
    placeholder,
    onChange: onChangeSelect,
    cssClass
  } = props

  const { cx, classes } = useStyles();

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
      className={cx(classes.selectLead, { [cssClass]: cssClass})}
      clearable
      value={value}
      disabled={isLoading || isError}
      label={labelSelect}
      placeholder={placeholder}
      onChange={(value) => filterUserLeads(value)}
      itemComponent={(props) => <SelectItem {...omit(props, ["lastName", "firstName", "databaseId"])} typeDropdow={typeDropdow} />}
      data={formatData()}
      rightSection={isLoading ? <Loader size={14} /> : null}
      searchable
      maxDropdownHeight={280}
      nothingFound="Nobody here"
      filter={(value, item) =>
        item.label.toLowerCase().includes(value.toLowerCase().trim()) ||
        item.email.toLowerCase().includes(value.toLowerCase().trim())
      }
    />
  );
}

SelectUserLead.defaultProps = {
  data: [],
  isError: false,
  isLoading: false,
  labelSelect: false,
  onChange: PropTypes.func,
  typeDropdow: 'icon',
  placeholder: 'placeholder select',
  className: null,
  value: null
}


SelectUserLead.propTypes = {
  data: PropTypes.array,
  isError: PropTypes.bool,
  isLoading: PropTypes.bool,
  labelSelect: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  typeDropdow: PropTypes.oneOf(['icon', 'Avatar']),
  value: PropTypes.number,
  className: PropTypes.string
}

export default SelectUserLead