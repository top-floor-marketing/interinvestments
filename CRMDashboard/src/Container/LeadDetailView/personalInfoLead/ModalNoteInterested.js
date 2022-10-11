import PropTypes from "prop-types";
import React, { useState } from "react";
// mantine dev
import { Button, createStyles, Modal, Tabs } from "@mantine/core";
import { IconPhoto, IconMessageCircle } from "@tabler/icons";
import { Notes } from "tabler-icons-react";

const useStyles = createStyles((theme, _params) => ({
  Button: {
    width: "min-content",
  },
  Modal: {},
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
        title="Introduce yourself!"
      >
        <Tabs defaultValue="gallery">
          <Tabs.List>
            <Tabs.Tab value="gallery" icon={<IconPhoto size={14} />}>
              Gallery
            </Tabs.Tab>
            <Tabs.Tab value="messages" icon={<IconMessageCircle size={14} />}>
              Messages
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="gallery" pt="xs">
            Gallery tab content
          </Tabs.Panel>

          <Tabs.Panel value="messages" pt="xs">
            Messages tab content
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
