import { ActionIcon, Tooltip } from "@mantine/core";
import { Eye } from 'tabler-icons-react';
import PropTypes from 'prop-types';

import omit from 'lodash/omit';

const URL_QUERY_ID_NAME = "agent-id";

const ViewLandingListing = (props) => {

  const fullUrl = (props.idAgent) ? `${props.uri}?${URL_QUERY_ID_NAME}=${props.idAgent}&shared=true` : props.uri;

  return (
    <Tooltip multiline
      position="top"
      color={"dark"}
      placement={"center"}
      label={props.labelTooltip}
      className={props.className}>
      <ActionIcon component="a" href={fullUrl} target="_blank" {...omit(props, ['labelTooltip', 'idAgent'])}>
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
  labelTooltip: "View property",
  idAgent: null,
  color: "dark"
};

ViewLandingListing.propTypes = {
  disabled: PropTypes.bool,
  color: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['transparent', 'hover', "default", "outline", "filled", "light"]),
  size: PropTypes.number,
  labelTooltip: PropTypes.string,
  idAgent: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default ViewLandingListing;
