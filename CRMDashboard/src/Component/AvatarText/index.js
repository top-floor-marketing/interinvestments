import React, { useCallback } from "react";
import {
  Avatar,
  createStyles,
  Tooltip
} from "@mantine/core";
import PropTypes from "prop-types";

import get from "lodash/get";
import upperCase from "lodash/upperCase";

const useStyles = createStyles((theme, _params) => {
  return {
    avatarColor: {
      backgroundColor: theme.colors[_params["color"]][6],
      border: `1px solid ${theme.colors[_params["color"]][8]} !important`,
      '.mantine-Avatar-placeholder': {
        color: `${theme.colors.white[0]} !important`,
        fontWeight: "600 !important",
        fontSize: "14px"
      }
    },
  };
});

const AvatarText = (props) => {
  const { color, className, src, firstName, lastName, size, title, onClick, tooltipLabel } = props;
  const { cx, classes } = useStyles({ color });

  const getText = useCallback(() => {
    if (!firstName && !lastName) return "";
    if (!lastName?.length) return upperCase(`${get(firstName, ["0"], "")}${get(firstName, ["1"], "")}`);
    return upperCase(`${get(firstName, ["0"], "")}${get(lastName, ["0"], "")}`);
  }, [firstName, lastName]);

  return (
    tooltipLabel ?
      <Tooltip label={tooltipLabel}>
        <Avatar
          onClick={() => onClick()}
          title={title}
          radius="_40px"
          src={src}
          size={size}
          className={cx(className, classes.avatarColor)}
        >
          {
            (!src) && getText()
          }
        </Avatar>
      </Tooltip>
      :
      <Avatar
        onClick={() => onClick()}
        title={title}
        radius="_40px"
        src={src}
        size={size}
        className={cx(className, classes.avatarColor)}
      >
        {
          (!src) && getText()
        }
      </Avatar>
  );
};

// Specifies the default values for props:
AvatarText.defaultProps = {
  color: "gray",
  firstName: null,
  lastName: null,
  size: "30px",
  className: "",
  title: null,
  src: null,
  tooltipLabel: null,
  onClick: () => { }
};

AvatarText.propTypes = {
  color: PropTypes.oneOf(['gray', 'dark', "primary", "secondary"]),
  size: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
  src: PropTypes.string,
  tooltipLabel: PropTypes.string
};

export default React.memo(AvatarText);
