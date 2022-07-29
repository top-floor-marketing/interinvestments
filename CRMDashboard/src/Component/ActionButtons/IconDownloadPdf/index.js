import { ActionIcon, Tooltip } from "@mantine/core";
import { FileDownload } from 'tabler-icons-react';
import PropTypes from 'prop-types';

import omit from 'lodash/omit';

const IconDownloadPdf = (props) => {
  return (
    <Tooltip multiline
      position="top"
      color={"dark"}
      placement={"center"}
      label={props.labelTooltip}
      withArrow className={props.className}>
      <ActionIcon {...omit(props, ['labelTooltip', 'id'])}>
        <FileDownload size={props.size} />
      </ActionIcon>
    </Tooltip>
  );
};

// Specifies the default values for props:
IconDownloadPdf.defaultProps = {
  disabled: false,
  className: "",
  variant: "hover",
  size: 20,
  labelTooltip: "Download PDF",
  id: null,
  color: "dark"
};

IconDownloadPdf.propTypes = {
  disabled: PropTypes.bool,
  color: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['transparent', 'hover', "default", "outline", "filled", "light"]),
  size: PropTypes.number,
  labelTooltip: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string
};

export default IconDownloadPdf;
