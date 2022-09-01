import React from 'react'
// mantine
import { SegmentedControl, Box } from '@mantine/core';
// styles 
import useStyles from './styles'
// global store
import useClientGlobalStore from '../../../GlobalStore/useClientGlobalStore'

const TypeLeads = () => {
  const { state: { addLeads: { typeLeads } }, actions: { setTypeLeads, setListingData } } = useClientGlobalStore()
  const { classes } = useStyles();

  const onChangeSegment = (valueSegment) => {
    if(valueSegment === 'LISTING') {
      // set valies services

      // set value type leads
      setTypeLeads(valueSegment)
    } else {
      // set valies services
      setListingData([])
      // set value type leads
      setTypeLeads(valueSegment)
    }
  }

  return (
    <Box className={classes.boxConatinerTypeLeads}>
      <SegmentedControl
        onChange={(value) => onChangeSegment(value)}
        value={typeLeads}
        className={classes.radioSegment}
        size='xl'
        data={[
          { label: 'Listing', value: 'LISTING' },
          { label: 'services', value: 'SERVICES' }
        ]}
      />
    </Box>
  )
}

export default TypeLeads