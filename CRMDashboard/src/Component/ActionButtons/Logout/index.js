import { ActionIcon, Tooltip } from "@mantine/core";
import { Logout } from 'tabler-icons-react';
import PropTypes from 'prop-types';

import { useDispatch } from "react-redux";
import { setLogout } from "../../../Store/userSlice";

import omit from 'lodash/omit';

const LogoutIcon = (props) => {

  const dispatch = useDispatch();  

  return (
    <Tooltip wrapLines gutter={10} label={props.labelTooltip} withArrow className={props.className}>
      <ActionIcon onClick={() => dispatch(setLogout())} {...omit(props, ['size','labelTooltip'])}><Logout size={props.size} /></ActionIcon>
    </Tooltip>
  );
};

// Specifies the default values for props:
LogoutIcon.defaultProps = {
    disabled: false,
    className: "",
    variant: "hover",
    size: 20,
    labelTooltip: "Logout",
    color: "dark",
};

  LogoutIcon.propTypes = {
    disabled: PropTypes.bool,
    color: PropTypes.string,
    className: PropTypes.string,
    variant: PropTypes.oneOf(['transparent', 'hover',"default", "outline", "filled", "light"]),
    size: PropTypes.number,
    labelTooltip: PropTypes.string,
    color: PropTypes.string,
};

export default LogoutIcon;
