import { memo } from "react";
import { ActionIcon, Tooltip, createStyles } from "@mantine/core";
import { BrandWhatsapp } from 'tabler-icons-react';
import PropTypes from 'prop-types';

import omit from 'lodash/omit';

const useStyles = createStyles((theme, _params) => {
  return {
    whatsApp: {
      '.icon-tabler': {
        color: `${theme.colors.success[6]} !important`,
        '&:hover': {
          color: `${theme.colors.success[8]} !important`,
        }
      }
    }
  };
});


const IconOpenWhatsApp = (props) => {
  const { classes, cx } = useStyles();

  const onOpenWhatsAppWeb = () => {
    if (props.phoneNumber)
      window.open(`https://wa.me/${props.phoneNumber.replace(/\D/g, "")}`, '_blank').focus();
    else if (props.otherPhoneNumber)
      window.open(`https://wa.me/${props.otherPhoneNumber.replace(/\D/g, "")}`, '_blank').focus();
  }

  return (
    <Tooltip multiline gutter={10} label={props.labelTooltip} className={props.className} color="success">
      <ActionIcon
        onClick={() => onOpenWhatsAppWeb()}
        className={cx(props.className, classes.whatsApp)}
        {...omit(props, ['size', 'phoneNumber', 'otherPhoneNumber', 'labelTooltip', 'className'])}>
        <BrandWhatsapp size={props.size} /></ActionIcon>
    </Tooltip>
  )
};

// Specifies the default values for props:
IconOpenWhatsApp.defaultProps = {
  disabled: false,
  className: "",
  variant: "hover",
  size: 20,
  labelTooltip: "Send Whatsapp message",
  phoneNumber: null,
  otherPhoneNumber: null
};

IconOpenWhatsApp.propTypes = {
  listNumber: PropTypes.array,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['transparent', 'hover', "default", "outline", "filled", "light"]),
  size: PropTypes.number,
  labelTooltip: PropTypes.string,
  phoneNumber: PropTypes.string,
  otherPhoneNumber: PropTypes.string
};

export default memo(IconOpenWhatsApp);
