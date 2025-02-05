import React, { useRef } from "react";
// compontes
import CardData from "./CardData";
import dayjs from "dayjs";
// mantine
import { Box } from "@mantine/core";
// css
import styles from "./styles.dl.module.scss";
// utils
import useOnScreen from "../../Hook/useOnScreen";
import numFormatter from "../../utils/FormaterNumber";

const DataLIsting = (props) => {
  const { data } = props;
  const rootRef = useRef();
  const onScreen = useOnScreen(rootRef);

  return (
    <Box ref={rootRef} className={styles.container}>
      {onScreen && (
        <Box className={styles.boxdata}>
          <CardData
            number={`${dayjs(
              data.estimatedDateOfCompletion.split("/")[2]
            ).format("YYYY")}`}
            type="text"
            description="Est. Date of Completion"
          />
          <CardData number={data.priceMin} type="number" description="Price Min" />
          <CardData number={data.priceMax} type="number" description="Price Max" />
          <CardData
            number={data.totalUnits ? parseInt(data.totalUnits) : null}
            type={data.totalUnits ? "number" : "text"}
            description="Total Units"
          />
        </Box>
      )}
    </Box>
  );
};

export default DataLIsting;
