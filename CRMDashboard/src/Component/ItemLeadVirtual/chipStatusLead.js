import React, { useCallback } from "react";

import PropTypes from "prop-types";

import { Badge, createStyles } from "@mantine/core";

import toLower from 'lodash/toLower';

const useStyles = createStyles((theme, _params) => {
  return {
    badgeContainer: {
      marginLeft: "auto !important",
      width: "180px !important",
      display: "flex",
      fontSize: "14px",
      flexDirection: "column",
      backgroundColor: theme.colors[_params.color][6],
      '&:hover': {
        backgroundColor: theme.colors[_params.color][8],
      },
      [`${theme.fn.smallerThan(850)}`]: {
        width: "120px !important",
        fontSize: "10px",
      }
    }
  };
});

const BadgeStatusLead = ({ status }) => {

  const getColorChip = useCallback(() => {
    switch (toLower(status)) {
      case "not contacted":
        return "error";
      case "contacted":
        return "primary";
      case "showing":
        return "secondary";
      case "contract":
        return "success";
      case "ask referrals":
        return "info";
      default:
        return "gray";
    }
  }, [status])

  const { classes } = useStyles({ color: getColorChip() });

  return (
    <Badge
      variant="filled"
      title={`Lead status:\n${status}`}
      className={classes.badgeContainer}>
      {status}
    </Badge>
  );
};

BadgeStatusLead.defaultProps = {
  status: "",
};

BadgeStatusLead.propTypes = {
  status: PropTypes.string,
};

export default React.memo(BadgeStatusLead);
