import { ActionIcon, createStyles } from "@mantine/core";
import { Share } from 'tabler-icons-react';
import PropTypes from 'prop-types';

const useStyles = createStyles((theme, _params, getRef) => ({
  cardContainer: {
    width: "67%",
    minHeight: "200px",
    boxShadow: theme.shadows.sm,
    height: "100%",
  },
}));

const ShareAgent = (props) => {
  const { classes } = useStyles();

  return (
    <ActionIcon {...props}><Share size={16} /></ActionIcon>
  );
};

// Specifies the default values for props:
ShareAgent.defaultProps = {
    className: "",
    variant: "hover",
    size: 16
};

  ShareAgent.propTypes = {
    color: PropTypes.string,
    className: PropTypes.string,
    variant: PropTypes.oneOf(['transparent', 'hover',"default", "outline", "filled", "light"]),
    size: PropTypes.number
};

export default ShareAgent;
