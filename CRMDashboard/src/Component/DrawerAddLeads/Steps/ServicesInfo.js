import React from 'react'
// mantine
import {
  Box,
  TextInput,
  Textarea,
  NumberInput,
} from '@mantine/core';
// icons
import { User, Mail, Note, Phone } from 'tabler-icons-react';
// styles
import useStyles from './styles'

const ServicesInfo = () => {
  const { classes } = useStyles();
  return (
    <Box className={classes.containerMain}>
      <TextInput
        className={classes.input}
        placeholder={null}
        label="Name leads"
        icon={<User />}
      />
      <TextInput
        className={classes.input}
        placeholder={null}
        label="Email client"
        icon={<Mail />}
      />
      <NumberInput
        className={classes.input}
        classNames={{
          input: classes.NumberInput,
          control: classes.controllNumberInput
        }}
        placeholder={null}
        label="Phone Number"
        icon={<Phone />}
      />
      <Textarea
        className={`${classes.input} ${classes.inputFull}`}
        placeholder={null}
        icon={<Note />}
        label="Note"
      />
    </Box>
  )
}

export default ServicesInfo