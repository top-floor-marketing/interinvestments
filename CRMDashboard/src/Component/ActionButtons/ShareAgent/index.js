import { useEffect } from "react";
import { ActionIcon,Tooltip } from "@mantine/core";
import { Share } from 'tabler-icons-react';
import { useClipboard } from '@mantine/hooks';
import PropTypes from 'prop-types';

import omit from 'lodash/omit';

const ShareAgent = (props) => {
  const clipboard = useClipboard({ timeout: 2000 });
  useEffect(() => {
    console.log("window.location.hostname", window.location.hostname)
  },[])
  return (
    <Tooltip wrapLines
     position="top" 
     color={clipboard.copied ? "success": "dark"} 
     placement={clipboard.copied ? "end": "center"} 
     label={(clipboard.copied) ? "Copied!" : props.labelTooltip} 
     withArrow className={props.className}>
      <ActionIcon {...omit(props, ['size','labelTooltip','id'])} onClick={() => clipboard.copy('Hello, world!')}><Share size={props.size} /></ActionIcon>
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
    id: null
};

  ShareAgent.propTypes = {
    disabled: PropTypes.bool,
    color: PropTypes.string,
    className: PropTypes.string,
    variant: PropTypes.oneOf(['transparent', 'hover',"default", "outline", "filled", "light"]),
    size: PropTypes.number,
    labelTooltip: PropTypes.string,
    id: PropTypes.number
};

export default ShareAgent;
