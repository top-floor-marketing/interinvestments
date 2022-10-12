import PropTypes from "prop-types";
import React, { useState } from "react";
import DOMPurify from "dompurify";
// mantine dev
import { Button, createStyles, Modal, Tabs } from "@mantine/core";
import { RichTextEditor } from "@mantine/rte";
import { IconPhoto, IconMessageCircle } from "@tabler/icons";
import { Notes } from "tabler-icons-react";
// utils

const useStyles = createStyles((theme, _params) => ({
  Button: {
    width: "min-content",
  },
}));

const ModalNoteInterested = ({ tite, commentListing, commentService }) => {
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles();

  return (
    <>
      <Modal
        size={700}
        opened={opened}
        onClose={() => setOpened(false)}
        title="Notes"
      >
        <Tabs defaultValue="properties">
          <Tabs.List>
            <Tabs.Tab value="properties" icon={<IconPhoto size={14} />}>
              Properties Note
            </Tabs.Tab>
            <Tabs.Tab value="services" icon={<IconMessageCircle size={14} />}>
              Services Note
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="properties" pt="xs">
            <RichTextEditor
              style={{ width: "100%" }}
              value={
                commentListing
                  ? DOMPurify.sanitize(commentListing)
                  : "<p>no notes available</p>"
              }
              readOnly
            />
          </Tabs.Panel>

          <Tabs.Panel value="services" pt="xs">
            <RichTextEditor
              style={{ width: "100%" }}
              value={
                commentService
                  ? DOMPurify.sanitize(commentService)
                  : "<p>no notes available</p>"
              }
              readOnly
            />
          </Tabs.Panel>
        </Tabs>
      </Modal>
      <Button
        onClick={() => setOpened(true)}
        leftIcon={<Notes />}
        className={classes.Button}
      >
        {tite}
      </Button>
    </>
  );
};

ModalNoteInterested.propTypes = {
  commentListing: PropTypes.string,
  commentService: PropTypes.string,
  tite: PropTypes.string,
};

export default ModalNoteInterested;
