import { ActionIcon, Tooltip } from "@mantine/core";
import { Edit } from 'tabler-icons-react';
import PropTypes from 'prop-types';

import omit from 'lodash/omit';

const EditModal = (props) => {
  return (
    <Tooltip wrapLines label={props.labelTooltip} withArrow className={props.className}>
      <ActionIcon {...omit(props, ['size','labelTooltip'])}><Edit size={props.size} /></ActionIcon>
    </Tooltip>
  );
};

// Specifies the default values for props:
EditModal.defaultProps = {
    disabled: false,
    className: "",
    variant: "hover",
    size: 20,
    labelTooltip: "Edit info",
    color: "dark"
};

  EditModal.propTypes = {
    disabled: PropTypes.bool,
    color: PropTypes.string,
    className: PropTypes.string,
    variant: PropTypes.oneOf(['transparent', 'hover',"default", "outline", "filled", "light"]),
    size: PropTypes.number,
    labelTooltip: PropTypes.string,
    color: PropTypes.string
};

export default EditModal;
