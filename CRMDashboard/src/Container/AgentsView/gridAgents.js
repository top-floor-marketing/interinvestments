import { memo,useState, useCallback } from 'react';
import { Box, createStyles, Modal } from "@mantine/core";
import { useViewportSize } from '@mantine/hooks';

import CardAgent from './cardAgent';
import ProfileView from '../ProfileView';

const useStyles = createStyles((theme, _params) => ({
  container: {
    width: "100%",
    height: "100%",
    display: "grid",
    gap: theme.other.spacing.p4,
    gridTemplateColumns: "repeat(1, 1fr)",
    [theme.fn.smallerThan(1100) && theme.fn.largerThan(600)]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    [theme.fn.smallerThan(1400) && theme.fn.largerThan(1100)]: {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
    [theme.fn.smallerThan(2200) && theme.fn.largerThan(1400)]: {
      gridTemplateColumns: "repeat(4, 1fr)",
    },
    [theme.fn.largerThan(2200)]: {
      gridTemplateColumns: "repeat(5, 1fr)",
    },
    gridAutoRows: "minmax(300px, 350px)",
    //maxHeight: "380px"
  },
  modal: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.fn.rgba(theme.colors.gray[0], 1),
  },
  bodyModal: {
    display: "flex",
    flexDirection: "column",
    height: "calc(80vh) !important",
    [`${theme.fn.smallerThan(600)}`]: {
      height: "600px !important",
    },
    [`${theme.fn.smallerThan(1400)}`]: {
      height: "calc(70vh) !important",
    }
  }
}));

const GridAgents = ({ data }) => {
  const { classes } = useStyles();
  const [openModal, setOpenModal] = useState({ open: false, idAgent: null });

  const { width } = useViewportSize();

  const getSizeModal = useCallback(() => {
    if(width>2000) return "80%";
    if(width>900) return "85%";
    if(width>800) return "95%";
    return "97%"
  },[width])

  const onCloseModal = () => {
    setOpenModal({ open: false, idAgent: null })
  }

  return (
    <Box className={classes.container}>
      <>
        <Modal
          closeOnClickOutside={false}
          size={getSizeModal()}
          opened={openModal.open}
          onClose={() => onCloseModal()}
          classNames={{
            modal: classes.modal,
            body: classes.bodyModal,
          }}
          overflow="inside"
        >
          <ProfileView idAgent={openModal.idAgent} />
        </Modal>
        {
          data.map((val, index) => (
            <CardAgent key={index} {...val} openModal={setOpenModal} />
          ))
        }
      </>
    </Box>
  )
};

export default memo(GridAgents);
