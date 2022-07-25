import { Box, createStyles, Text, Modal } from "@mantine/core";
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
    margin: 0,
    color: theme.colors.dark[0],
    fontSize: "18px",
    lineHeight: "20px",
    fontWeight: 700,
  }
}));

const ModalEditInfo = ({ isOpen, dataAgent, onClose }) => {
  const { classes } = useStyles();

  return (
    <Modal
    opened={isOpen && dataAgent}
    onClose={() => onClose()}
    title={<Box className={classes.boxTitle}>
        <Edit size={20} />
        <Text component="h1" className={classes.titleModal}>Edit agent info</Text>
    </Box>}
    >
    
  </Modal>
  );
};

// Specifies the default values for props:
ModalEditInfo.defaultProps = {
    isOpen: false,
    dataAgent: null,
    onClose: () => {}
};

export default ModalEditInfo;
