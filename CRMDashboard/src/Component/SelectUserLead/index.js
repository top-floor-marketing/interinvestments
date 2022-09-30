import PropTypes from "prop-types"
import React from 'react'
// components
import SelectItem from './SelectItem';
// mantine
import { Select, Loader } from "@mantine/core";
// ustils
import filterlodash from 'lodash/filter';
// styles
import useStyles from './styles'

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
  } = props
  const { classes } = useStyles();

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
      className={classes.selectLead}
      clearable
      value={value}
      disabled={isLoading || isError}
      label={labelSelect}
      placeholder={placeholder}
      onChange={(value) => filterUserLeads(value)}
      itemComponent={(props) => <SelectItem {...props} typeDropdow={typeDropdow} />}
      data={formatData()}
      rightSection={isLoading ? <Loader size={14} /> : null}
      searchable
      maxDropdownHeight={250}
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
  labelSelect: 'Label select',
  onChange: PropTypes.func,
  typeDropdow: 'icon',
  placeholder: 'placeholder select'
  // value: {}
}


SelectUserLead.propTypes = {
  data: PropTypes.array,
  isError: PropTypes.bool,
  isLoading: PropTypes.bool,
  labelSelect: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  typeDropdow: PropTypes.oneOf(['icon', 'Avatar']),
  value: PropTypes.object
}

export default SelectUserLead