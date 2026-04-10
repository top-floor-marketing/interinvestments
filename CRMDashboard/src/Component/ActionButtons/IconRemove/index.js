import { ActionIcon, Tooltip } from "@mantine/core";
import { Trash } from 'tabler-icons-react';
import PropTypes from 'prop-types';

import omit from 'lodash/omit';

const IconRemove = (props) => {
  return (
    <Tooltip 
      color={"dark"}
      position={props.position}
      label={props.labelTooltip}
      className={props.className}>
      <ActionIcon {...omit(props, ['position', 'id', 'placementTooltip', 'labelTooltip'])}>
        <Trash size={props.size} />
      </ActionIcon>
    </Tooltip>
  );
};

// Specifies the default values for props:
IconRemove.defaultProps = {
  disabled: false,
  className: "",
  variant: "hover",
  size: 20,
  labelTooltip: "Remove featured property",
  id: null,
  color: "dark",
  position: "",
  onClick: () => {}
};

IconRemove.propTypes = {
  disabled: PropTypes.bool,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['transparent', 'hover', "default", "outline", "filled", "light"]),
  size: PropTypes.number,
  labelTooltip: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  position: PropTypes.string,
  onClick: PropTypes.func
};

export default IconRemove;
