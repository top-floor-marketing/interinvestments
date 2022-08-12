import { Card, Box, createStyles, Paper, Select } from "@mantine/core";
import { useEffect, useRef } from "react";

const useStyles = createStyles((theme, _params, getRef) => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: theme.other.spacing.p4,
    height: "auto",
    minHeight: "50px",
    [`${theme.fn.smallerThan("md")}`]: { 
        flexDirection: "column",
    }
  },
}));

const FilterOptions = () => {
  const { classes } = useStyles();
  const refInput = useRef(null);

  useEffect(() => {
   /*  setInterval(() => {
        if(refInput?.current) {
            refInput.current.click()
        }
    }, 1000) */
    if(refInput?.current) {
        refInput.current.click()
    }
  },[]);

  return (
      <Paper className={classes.container}>
        <Select
        ref={refInput}
      label="Your favorite framework/library"
      placeholder="Pick one"
      data={[
        { value: 'react', label: 'React' },
        { value: 'ng', label: 'Angular' },
        { value: 'svelte', label: 'Svelte' },
        { value: 'vue', label: 'Vue' },
      ]}
    />
      </Paper>
  );
};

export default FilterOptions;
