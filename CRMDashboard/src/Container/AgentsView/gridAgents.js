import {memo} from 'react';
import { Box, createStyles } from "@mantine/core";

import CardAgent from './cardAgent';

const useStyles = createStyles((theme, _params) => ({
  container: {
    width: "100%",
    height: "100%",
    display: "grid",
    gap: theme.other.spacing.p4,
    gridTemplateColumns: "repeat(1, 1fr)",
    [theme.fn.smallerThan(900) && theme.fn.largerThan(600)]: {
        gridTemplateColumns: "repeat(2, 1fr)",
    },
    [theme.fn.smallerThan(1400) && theme.fn.largerThan(900)]: {
        gridTemplateColumns: "repeat(3, 1fr)",
    },
    [theme.fn.largerThan(1400)]: {
        gridTemplateColumns: "repeat(4, 1fr)",
    },
    [theme.fn.largerThan(1900)]: {
        gridTemplateColumns: "repeat(5, 1fr)",
    },
    gridAutoRows: "minmax(150px, 300px)"
  },
}));

const GridAgents = ({ data }) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.container}>
      {
        data.map((val, index) => (
            <CardAgent key={index} {...val} />
        ))
      }
    </Box>
  )
};

export default memo(GridAgents);
