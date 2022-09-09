import React from 'react'
// mantine dev
import { RichTextEditor } from '@mantine/rte';
import { Box, Text, createStyles } from '@mantine/core'
// global store
import useClientGlobalStore from '../../../GlobalStore/useClientGlobalStore'
// components
import SelectStateLeads from '../../SelectStateLeads'

const useStyles = createStyles((theme, _params) => {
  return (
    {
      containerLeadsInfo: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        gap: '14px'
      },
      containerFilters: {
        width: '40%'
      },
      RichTextEditor: {
        '.ql-editor': {
          minHeight: "30vh",
          'blockquote': {
            color: `${theme.colors.gray[9]} !important`,
            borderLeft: `4px solid ${theme.colors.primary[6]} !important`
          },
          'ul li::marker': {
            color: `${theme.colors.black[0]} !important`
          },
          'ul ol::marker': {
            color: `${theme.colors.black[0]} !important`
          }
        }
      }
    }
  )
});


const CommentLeads = () => {
  const {
    state: {
      addLeads: { stateLeads, noteLeads }
    },
    actions: { setStateLeads, setNoteLeads }
  } = useClientGlobalStore()
  const { classes } = useStyles();



  const props = {
    controls: [
      ['bold', 'italic', 'underline', 'strike', 'clean'],
      ['unorderedList', 'orderedList', 'blockquote'],
      ['h1', 'h2', 'h3'],
      ['alignLeft', 'alignCenter', 'alignRight'],
    ],
    className: classes.RichTextEditor,
    stickyOffset: 40
  }


  return (
    <Box className={classes.containerLeadsInfo}>
      <Box className={classes.containerFilters}>
        <Text component='h3'>Initial State Leads</Text>
        <SelectStateLeads
          value={stateLeads}
          onChange={(idState) => setStateLeads(idState)}
        />
      </Box>
      <RichTextEditor
        {...props}
        value={noteLeads}
        onChange={(note) => setNoteLeads(note)}
      />
    </Box>
  )
}

export default CommentLeads