import React from "react";

import PropTypes from "prop-types";

import { Badge , createStyles } from "@mantine/core";

import toLower from 'lodash/toLower';

const useStyles = createStyles((theme, _params) => {
  return {
    badgeContainer: {
      width: "160px !important",
    }
  };
});

const BadgeStatusLead = ({ status }) => {
  const { classes } = useStyles();

  const getColorChip = () => {
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
        return "";
    }
  }

  return (
    <Badge 
    variant="filled" 
    color={getColorChip()} 
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
