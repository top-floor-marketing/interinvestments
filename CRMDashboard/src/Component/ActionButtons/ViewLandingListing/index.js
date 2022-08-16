import { ActionIcon, Tooltip } from "@mantine/core";
import { Eye } from 'tabler-icons-react';
import PropTypes from 'prop-types';

import omit from 'lodash/omit';

const ViewLandingListing = (props) => {

  const fullUrl = `${props.uri}?id=${props.id}&shared=true`;

  return (
    <Tooltip multiline
      position="top"
      color={"dark"}
      placement={"center"}
      label={props.labelTooltip}
      className={props.className}>
      <ActionIcon component="a" href={fullUrl} target="_blank" {...omit(props, ['labelTooltip', 'id'])}>
        <Eye size={props.size} />
      </ActionIcon>
    </Tooltip>
  );
};

// Specifies the default values for props:
ViewLandingListing.defaultProps = {
  disabled: false,
  className: "",
  variant: "hover",
  size: 20,
  labelTooltip: "Visit listing",
  id: null,
  color: "dark"
};

ViewLandingListing.propTypes = {
  disabled: PropTypes.bool,
  color: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['transparent', 'hover', "default", "outline", "filled", "light"]),
  size: PropTypes.number,
  labelTooltip: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string
};

export default ViewLandingListing;
