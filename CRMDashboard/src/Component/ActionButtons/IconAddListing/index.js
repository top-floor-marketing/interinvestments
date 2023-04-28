import { ActionIcon, Tooltip } from "@mantine/core";
import { PlaylistAdd } from 'tabler-icons-react';
import PropTypes from 'prop-types';

import omit from 'lodash/omit';

const IconAddListing = (props) => {
  return (
    <Tooltip 
      color={"dark"}
      position={props.position}
      label={props.labelTooltip}
      className={props.className}>
      <ActionIcon {...omit(props, ['position', 'id', 'placementTooltip', 'labelTooltip'])}>
        <PlaylistAdd size={props.size} />
      </ActionIcon>
    </Tooltip>
  );
};

// Specifies the default values for props:
IconAddListing.defaultProps = {
  disabled: false,
  className: "",
  variant: "hover",
  size: 20,
  labelTooltip: "Add to featured property",
  id: null,
  color: "dark",
  position: "",
  onClick: () => {}
};

IconAddListing.propTypes = {
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

export default IconAddListing;
