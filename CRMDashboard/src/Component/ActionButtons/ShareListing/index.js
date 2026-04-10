import { memo } from 'react';
import { ActionIcon, Tooltip } from "@mantine/core";
import { ArrowForwardUp } from 'tabler-icons-react';
import { useClipboard } from '@mantine/hooks';
import PropTypes from 'prop-types';

import omit from 'lodash/omit';

const URL_QUERY_ID_NAME = "agent-id";
const ENVIROMENT = process.env.REACT_APP_NODE_ENV;
const DOMAIN_URL =
  ENVIROMENT === "production"
    ? process.env.REACT_APP_DOMAIN_PROD
    : process.env.REACT_APP_DOMAIN_DEV;

const ShareListing = (props) => {
  const clipboard = useClipboard({ timeout: 2000 });

  const clipboardCopy = () => {
    const removeSlash = JSON.parse(JSON.stringify(props.uri.substring(1)));
    clipboard.copy(
      `${DOMAIN_URL}${removeSlash}?${URL_QUERY_ID_NAME}=${props.id}&shared=true`
    );
  }

 return (
    <Tooltip 
      position="top"
      color={clipboard.copied ? "success" : "dark"}
      placement={clipboard.copied ? "end" : "center"}
      label={(clipboard.copied) ? "Copied!" : props.labelTooltip}
      className={props.className}>
      <ActionIcon {...omit(props, ['labelTooltip', 'id'])} onClick={() => clipboardCopy()}>
        <ArrowForwardUp size={props.size} />
      </ActionIcon>
    </Tooltip>
  ); 
};

// Specifies the default values for props:
ShareListing.defaultProps = {
  disabled: false,
  className: "",
  variant: "hover",
  size: 20,
  labelTooltip: "Share property",
  id: null,
  uri: null,
  color: "dark"
};

ShareListing.propTypes = {
  disabled: PropTypes.bool,
  color: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['transparent', 'hover', "default", "outline", "filled", "light"]),
  size: PropTypes.number,
  labelTooltip: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  uri: PropTypes.string,
};

export default memo(ShareListing);
