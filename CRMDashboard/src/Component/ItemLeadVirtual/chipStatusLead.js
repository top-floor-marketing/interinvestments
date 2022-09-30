import React, { useCallback } from "react";

import PropTypes from "prop-types";

import { Badge, createStyles } from "@mantine/core";

import toLower from 'lodash/toLower';

const useStyles = createStyles((theme, _params) => {
  return {
    colorBadge: {
      backgroundColor: theme.colors[_params.color][6],
      '&:hover': {
        backgroundColor: theme.colors[_params.color][8],
      },
    },
    badgeContainer: {
      marginLeft: "auto !important",
      width: "180px !important",
      display: "flex",
      fontSize: "14px",
      flexDirection: "column",
      [`${theme.fn.smallerThan(700)}`]: {
        fontSize: "12px",
        marginLeft: "auto !important",
        marginRight: "auto !important",
      }
    },
    shortBadge: {
      marginLeft: "auto !important",
      width: "100px !important",
      display: "flex",
      fontSize: "10px",
      flexDirection: "column",
      [`${theme.fn.smallerThan(700)}`]: {
        marginLeft: "auto !important",
        marginRight: "auto !important",
      }
    }
  };
});

const BadgeStatusLead = ({ status, onClick, className, isShort }) => {

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

  const { cx, classes } = useStyles({ color: getColorChip() });

  return (
    <Badge
      onClick={() => onClick()}
      variant="filled"
      title={`Lead state:\n${status}`}
      className={cx(classes.colorBadge, className, { [classes.badgeContainer]: !className && !isShort, [classes.shortBadge]: isShort })}>
      {status}
    </Badge>
  );
};

BadgeStatusLead.defaultProps = {
  status: "",
  onClick: () => {},
  className: null,
  isShort: false
};

BadgeStatusLead.propTypes = {
  status: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  isShort: PropTypes.bool
};

export default React.memo(BadgeStatusLead);
