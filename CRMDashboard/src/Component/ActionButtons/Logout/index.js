import { ActionIcon, Tooltip } from "@mantine/core";
import { Logout } from 'tabler-icons-react';
import PropTypes from 'prop-types';

import omit from 'lodash/omit';

import useClientGlobalStore from "../../../GlobalStore/useClientGlobalStore";

const LogoutIcon = (props) => {

  const { actions: { setLogout } } = useClientGlobalStore()

  return (
    <Tooltip  gutter={10} label={props.labelTooltip} className={props.className}>
      <ActionIcon onClick={() => setLogout()}  {...omit(props, ['size', 'labelTooltip'])}><Logout size={props.size} /></ActionIcon>
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
  variant: PropTypes.oneOf(['transparent', 'hover', "default", "outline", "filled", "light"]),
  size: PropTypes.number,
  labelTooltip: PropTypes.string,
};

export default LogoutIcon;
