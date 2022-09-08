import React, { useCallback } from "react";
import {
  Avatar,
  createStyles
} from "@mantine/core";
import PropTypes from "prop-types";

import get from "lodash/get";
import head from "lodash/head";
import upperCase from "lodash/upperCase";
import words from "lodash/words";

const useStyles = createStyles((theme, _params) => {
    return {
      avatarColor: {
        backgroundColor: theme.colors[_params["color"]][6],
        border: `1px solid ${theme.colors[_params["color"]][8]} !important`,
        '.mantine-Avatar-placeholder': {
            color: `${theme.colors.white[0]} !important`,
            fontWeight: "600 !important"
        }
      },
    };
  });

const AvatarText = (props) => {
  const { color, className, firstName, lastName, size } = props;
  const { cx, classes } = useStyles({ color });

  const getText = useCallback(() => {
    if(!firstName && !lastName) return "";
    const wordsFistName = words(firstName);
    const wordsLastName = words(lastName);
    if(!wordsLastName.length) return upperCase(`${head(get(wordsFistName, ["0"], "")),head(get(wordsFistName, ["1"], ""))}`);
    return upperCase(`${head(get(wordsFistName, ["0"], ""))}${head(get(wordsLastName, ["0"], ""))}`);
  },[firstName, lastName]);

  return (
    <Avatar 
    radius="_40px"
    src={null}
    size={size}
    alt=""
    className={cx(className, classes.avatarColor)}
    >
      {getText()}
    </Avatar>
  );
};

// Specifies the default values for props:
AvatarText.defaultProps = {
    color: "gray",
    firstName: null,
    lastName: null,
    size: "30px",
    className: ""
};
  
AvatarText.propTypes = {
    color: PropTypes.oneOf(['gray', 'dark', "primary", "secondary"]),
    size: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    className: PropTypes.string,
};

export default React.memo(AvatarText);
