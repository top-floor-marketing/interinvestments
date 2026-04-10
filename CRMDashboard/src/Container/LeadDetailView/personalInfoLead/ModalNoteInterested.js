import PropTypes from 'prop-types';
import React, { useState } from 'react';
import DOMPurify from 'dompurify';
// mantine dev
import {
  Button,
  createStyles,
  Modal,
  Text,
  Box,
  Group,
  Textarea,
} from '@mantine/core';
// import { RichTextEditor } from "@mantine/rte";
import { MapPin, ListDetails, Notes } from 'tabler-icons-react';
import { map } from 'lodash';
import { removeTags } from '../../../Utils/globalConstants';

import TabsServiceForms from './tabsServiceForms';

const useStyles = createStyles((theme, _params) => ({
  button: {
    fontSize: '12px',
    marginTop: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 'min-content',
  },
  bodyModal: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '200px',
    gap: theme.other.spacing.p4,
    paddingTop: theme.other.spacing.p4,
    svg: {
      color: theme.colors.secondary[8],
    },
  },
}));

const ModalNoteInterested = ({
  tite,
  commentListing,
  commentService,
  serviceList,
}) => {
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles();

  const arrayServicePost = map(serviceList, (val) => {
    return val?.databaseId || 0;
  });

  return (
    <>
      <Modal size={'xl'} opened={opened} onClose={() => setOpened(false)}>
        <Box className={classes.bodyModal}>
          {commentListing && (
            <>
              <Group spacing='xs'>
                <MapPin size={20} />{' '}
                <Text color='secondary'>Properties notes:</Text>
              </Group>

              <Textarea
                style={{ width: '100%' }}
                readOnly
                value={removeTags(commentListing)}
                minRows={5}
                autosize
              />
            </>
          )}

          {commentService && (
            <>
              <Group spacing='xs'>
                <ListDetails size={20} />{' '}
                <Text color='secondary'>Services notes:</Text>
              </Group>
              <Textarea
                style={{ width: '100%' }}
                readOnly
                value={removeTags(commentService)}
                minRows={5}
                autosize
              />
            </>
          )}

          {arrayServicePost && (
            <Box>
              <Group spacing='xs'>
                <ListDetails size={20} />{' '}
                <Text color='secondary'>Services forms:</Text>
              </Group>
              <TabsServiceForms arrayServicePost={arrayServicePost} />
            </Box>
          )}
        </Box>
      </Modal>

      {(arrayServicePost || commentService || commentListing) && (
        <Button
          onClick={() => setOpened(true)}
          leftIcon={<Notes />}
          className={classes.button}
        >
          {tite}
        </Button>
      )}
    </>
  );
};

ModalNoteInterested.propTypes = {
  commentListing: PropTypes.string,
  commentService: PropTypes.string,
  tite: PropTypes.string,
};

export default ModalNoteInterested;
