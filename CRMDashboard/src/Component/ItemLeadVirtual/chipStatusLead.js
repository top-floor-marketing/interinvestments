import React from "react";

import PropTypes from "prop-types";

import { Chip, createStyles } from "@mantine/core";

import toLower from 'lodash/toLower';

const useStyles = createStyles((theme, _params) => {
  return {
  };
});

const ChipStatusLead = ({ status }) => {
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
    <Chip variant="filled" radius="xs" color={getColorChip()}>
      {status}
    </Chip>
  );
};

ChipStatusLead.defaultProps = {
  status: "",
};

ChipStatusLead.propTypes = {
  status: PropTypes.string,
};

export default React.memo(ChipStatusLead);
