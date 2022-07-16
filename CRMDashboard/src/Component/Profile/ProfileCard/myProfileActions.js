import { Box, createStyles, Text, } from "@mantine/core";

import { ShareAgent, EditModal } from "../../ActionButtons";

import PropTypes from 'prop-types';

const useStyles = createStyles((theme, _params, getRef) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    gap: theme.other.spacing.p3,
    justifyContent: "space-between",
    alignContent: "center"
  },
  titleCard: {
    fontSize: "18px",
    fontWeight: 700,
  },
  shareButton: {
    marginLeft: "auto",
    marginTop: "auto",
    marginBottom: "auto",
    borderRadius: "10px",
  },
  editButton: {
    marginTop: "auto",
    marginBottom: "auto"
  }
}));

const MyProfileActions = ({ isLoading, id }) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.container}>
        <Text className={classes.titleCard}>My profile</Text>
        <ShareAgent id={id} disabled={isLoading} className={classes.shareButton} />
        <EditModal disabled={isLoading} className={classes.editButton}/>
    </Box>
  );
};

// Specifies the default values for props:
MyProfileActions.defaultProps = {
    isLoading: false,
    id: null
};

MyProfileActions.propTypes = {
    isLoading: PropTypes.bool,
    id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ])
};

export default MyProfileActions;
