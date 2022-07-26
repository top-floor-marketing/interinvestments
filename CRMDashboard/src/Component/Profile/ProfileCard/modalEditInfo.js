import { Box, createStyles, Text, Modal, Group, Button, ScrollArea, TextInput, Textarea } from "@mantine/core";
import { useForm, joiResolver } from '@mantine/form';
import { RichTextEditor } from '@mantine/rte';
import Joi from 'joi';
import { get } from "lodash";
import { Edit } from 'tabler-icons-react';


const useStyles = createStyles((theme, _params, getRef) => ({
  boxTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: theme.other.spacing.p2,
  },
  titleModal: {
    margin: "0px !important",
    padding: "0px !important",
    color: theme.colors.dark[0],
    fontSize: "18px",
    lineHeight: "20px",
    fontWeight: 700,
  },
  containerForm: {
    paddingRight: "5px !important",
    width: "100%",
    display: "grid",
    maxHeight: "62vh",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: theme.other.spacing.p4,
    marginBottom: theme.other.spacing.p4,
    [`${theme.fn.smallerThan(750)}`]: {
      gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
    },
  },
  gridColumnFull: {
    gridColumn: "1 / -1",
    width: "100%"
  },
  labelAboutMe: {
    display: "inline-block",
    fontSize: "14px",
    fontWeight: 500,
    color: "#1b1b1b",
    wordBreak: "break-word",
    cursor: "col-resize"
  }
}));

const schemaEditAgent = Joi.object({
  firstName: Joi.string().required().min(3).messages({
    "string.min": "First Name should have at least 3 letters",
    "string.empty": "Required",
    "any.required": "Required",
  }),
  lastName: Joi.string().required().min(3).messages({
    "string.min": "First Name should have at least 3 letters",
    "string.empty": "Required",
    "any.required": "Required",
  }),
  position: Joi.string().required().min(3).messages({
    "string.min": "First Name should have at least 3 letters",
    "string.empty": "Required",
    "any.required": "Required",
  }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    "string.email": "Invalid email",
    "string.empty": "Required",
    "any.required": "Required",
  }),
  facebook: Joi.string().uri({
    scheme: [
      'https',
    ]
  }).empty('')
  .allow('').messages({
    "string.uri": "Invalid url",
    "string.uriCustomScheme": "Invalid url",
  }),
  instagram: Joi.string().uri({
    scheme: [
      'https',
    ]
  }).empty('')
  .allow('').messages({
    "string.uri": "Invalid url",
    "string.uriCustomScheme": "Invalid url",
  }),
  twitter: Joi.string().uri({
    scheme: [
      'https',
    ]
  }).empty('')
  .allow('').messages({
    "string.uri": "Invalid url",
    "string.uriCustomScheme": "Invalid url",
  }),
  linkedin: Joi.string().uri({
    scheme: [
      'https',
    ]
  }).empty('')
  .allow('').messages({
    "string.uri": "Invalid url",
    "string.uriCustomScheme": "Invalid url",
  }),
});


const ModalEditInfo = ({ isOpen, dataAgent, onClose, isLoading, onSubmit }) => {
  const { classes } = useStyles();

  const form = useForm({
    validate: joiResolver(schemaEditAgent),
    initialValues: {
      avatarUrl: get(dataAgent, ["avatar"], ""),
      content: get(dataAgent, ["content"], ""),
      email: get(dataAgent, ["email"], ""),
      facebook: get(dataAgent, ["facebook"], ""),
      instagram: get(dataAgent, ["instagram"], ""),
      linkedin: get(dataAgent, ["linkedin"], ""),
      twitter: get(dataAgent, ["twitter"], ""),
      position: get(dataAgent, ["position"], ""),
      firstName: get(dataAgent, ["firstName"], ""),
      lastName: get(dataAgent, ["lastName"], ""),
    },
  });

  const onCloseModalReset = () => {
    form.reset();
    onClose();
  }

  return (
    <Modal
      closeOnEscape={!isLoading}
      closeOnClickOutside={false}
      closeButtonLabel={!isLoading}
      opened={isOpen && dataAgent}
      onClose={() => onCloseModalReset()}
      title={<Box className={classes.boxTitle}>
        <Edit size={20} />
        <Text component="h1" className={classes.titleModal}>Edit agent info</Text>
      </Box>}
    >

      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <ScrollArea offsetScrollbars scrollbarSize={6}>
          <Box className={classes.containerForm}>

            <TextInput
              disabled={isLoading}
              label="First Name"
              placeholder="First Name"
              {...form.getInputProps('firstName')}
            />
            <TextInput
              disabled={isLoading}
              label="Last Name"
              placeholder="Last Name"
              {...form.getInputProps('lastName')}
            />
            <TextInput
              disabled={isLoading}
              label="Position"
              placeholder="Position"
              {...form.getInputProps('position')}
            />

            <TextInput
              disabled={isLoading}
              label="Email"
              placeholder="Email"
              {...form.getInputProps('email')}
            />
            <Box className={classes.gridColumnFull}>
              <Text component="label" for="content" className={classes.labelAboutMe}>About me</Text>
              <RichTextEditor
                controls={[
                  ['bold', 'italic', 'underline'],
                  ['h3', 'h4', 'h5'],
                  ['alignLeft', 'alignCenter', 'alignRight'],
                ]}
                disabled={isLoading}
                placeholder="About me"
                {...form.getInputProps('content')}
              />
            </Box>

            <TextInput
              disabled={isLoading}
              label="Facebook"
              placeholder="Facebook profile"
              {...form.getInputProps('facebook')}
            />

            <TextInput
              disabled={isLoading}
              label="Instagram"
              placeholder="Instagram profile"
              {...form.getInputProps('instagram')}
            />

            <TextInput
              disabled={isLoading}
              label="Twitter"
              placeholder="Twitter profile"
              {...form.getInputProps('twitter')}
            />

            <TextInput
              disabled={isLoading}
              label="Linkedin"
              placeholder="Linkedin profile"
              {...form.getInputProps('linkedin')}
            />

          </Box>
        </ScrollArea>

        <Group position="right" mt="16px">
          <Button type="submit">Save</Button>
        </Group>
      </form>


    </Modal>
  );
};

// Specifies the default values for props:
ModalEditInfo.defaultProps = {
  isOpen: false,
  dataAgent: null,
  onClose: () => { },
  onSubmit: () => { },
  isLoading: false
};

export default ModalEditInfo;
