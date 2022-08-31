import React from 'react'
// mantine
import { SegmentedControl, Box } from '@mantine/core';
// styles 
import useStyles from './styles'
// global store
import useClientGlobalStore from '../../../GlobalStore/useClientGlobalStore'

const TypeLeads = () => {
  const { state: { addLeads: { typeLeads } }, actions: { setTypeLeads } } = useClientGlobalStore()
  const { classes } = useStyles();

  return (
    <Box className={classes.boxConatinerTypeLeads}>
      <SegmentedControl
        onChange={(value) => setTypeLeads(value)}
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