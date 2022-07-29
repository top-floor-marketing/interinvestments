import { ActionIcon, Tooltip } from "@mantine/core";
import { ExternalLink } from 'tabler-icons-react';
import { useClipboard } from '@mantine/hooks';
import PropTypes from 'prop-types';

import omit from 'lodash/omit';

const ENVIROMENT = process.env.REACT_APP_NODE_ENV;
const DOMAIN_URL =
  ENVIROMENT === "production"
    ? process.env.REACT_APP_DOMAIN_PROD
    : process.env.REACT_APP_DOMAIN_DEV;

const ShareAgent = (props) => {
  const clipboard = useClipboard({ timeout: 2000 });

  const clipboardCopy = () => {
    clipboard.copy(`${DOMAIN_URL}agent?id=${props.id}&shared=true`)
  }

  return (
    <Tooltip multiline
      position="top"
      color={clipboard.copied ? "success" : "dark"}
      placement={clipboard.copied ? "end" : "center"}
      label={(clipboard.copied) ? "Copied!" : props.labelTooltip}
      withArrow className={props.className}>
      <ActionIcon {...omit(props, ['labelTooltip', 'id'])} onClick={() => clipboardCopy()}><ExternalLink size={props.size} /></ActionIcon>
    </Tooltip>
  );
};

// Specifies the default values for props:
ShareAgent.defaultProps = {
  disabled: false,
  className: "",
  variant: "hover",
  size: 20,
  labelTooltip: "Share my profile",
  id: null,
  color: "dark"
};

ShareAgent.propTypes = {
  disabled: PropTypes.bool,
  color: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['transparent', 'hover', "default", "outline", "filled", "light"]),
  size: PropTypes.number,
  labelTooltip: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string
};

export default ShareAgent;
