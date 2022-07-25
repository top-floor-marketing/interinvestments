import { ActionIcon, Tooltip } from "@mantine/core";
import { Trash } from 'tabler-icons-react';
import PropTypes from 'prop-types';

import omit from 'lodash/omit';

const IconRemove = (props) => {
  return (
    <Tooltip multiline
      position="top"
      color={"dark"}
      placement={props.placementTooltip}
      label={props.labelTooltip}
      withArrow className={props.className}>
      <ActionIcon {...omit(props, ['labelTooltip', 'id', 'placementTooltip'])}>
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
  labelTooltip: "Remove featured listing",
  id: null,
  color: "dark",
  placementTooltip: "center"
};

IconRemove.propTypes = {
  disabled: PropTypes.bool,
  color: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['transparent', 'hover', "default", "outline", "filled", "light"]),
  size: PropTypes.number,
  labelTooltip: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
  placementTooltip: PropTypes.string,
};

export default IconRemove;
