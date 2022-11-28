import PropTypes from "prop-types";
import React, { useState } from "react";
import DOMPurify from "dompurify";
// mantine dev
import { Button, createStyles, Modal, Text, Box, Group } from "@mantine/core";
import { RichTextEditor } from "@mantine/rte";
import { IconMapPin, IconListDetails } from "@tabler/icons";
import { Notes } from "tabler-icons-react";
import { map } from "lodash";

import TabsServiceForms from "./tabsServiceForms";

const useStyles = createStyles((theme, _params) => ({
  button: {
    fontSize: '12px',
    marginTop: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: "min-content",
  },
  bodyModal: {
    display: "flex",
    flexDirection: "column",
    minHeight: "200px",
    gap: theme.other.spacing.p4,
    paddingTop: theme.other.spacing.p4,
    svg: {
      color: theme.colors.secondary[8]
    }
  }
}));

const ModalNoteInterested = ({ tite, commentListing, commentService, serviceList }) => {

  const [opened, setOpened] = useState(false);
  const { classes } = useStyles();

  const arrayServicePost = map(serviceList, (val) => {
    return val?.databaseId || 0
  });

  return (
    <>
      <Modal
        size={"xl"}
        opened={opened}
        onClose={() => setOpened(false)}
      >

        <Box className={classes.bodyModal}>

          {
            (commentListing)
            &&
            <>
              <Group spacing="xs">
                <IconMapPin size={20} /> <Text color="secondary">Properties notes:</Text>
              </Group>


              <RichTextEditor
                style={{ width: "100%" }}
                value={
                  DOMPurify.sanitize(commentListing)
                }
                readOnly
              />
            </>
          }


          {

            (commentService)
            &&
            <>
              <Group spacing="xs">
                <IconListDetails size={20} /> <Text color="secondary">Services notes:</Text>
              </Group>
              <RichTextEditor
                style={{ width: "100%" }}
                value={
                  DOMPurify.sanitize(commentService)
                }
                readOnly
              />
            </>
          }

          {
            (arrayServicePost)
            &&
            <>
              <Group spacing="xs">
                <IconListDetails size={20} /> <Text color="secondary">Services forms:</Text>
              </Group>
              <TabsServiceForms arrayServicePost={arrayServicePost} />
            </>
          }

        </Box>

      </Modal>

      {
        (arrayServicePost || commentService || commentListing)
        &&
        <Button
          onClick={() => setOpened(true)}
          leftIcon={<Notes />}
          className={classes.button}
        >
          {tite}
        </Button>
      }

    </>
  );
};

ModalNoteInterested.propTypes = {
  commentListing: PropTypes.string,
  commentService: PropTypes.string,
  tite: PropTypes.string,
};

export default ModalNoteInterested;
