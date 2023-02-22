import React from "react";
// mantine
import { Box, Table, Text } from "@mantine/core";
// css
import styles from "./styles.cl.module.scss";

import get from "lodash/get";

const TableContendCollapse = ({ data, columns }) => {
  const rows = data.map((element, index) => (
    <tr key={index}>
      <td className="w-[110px]">{element.name}</td>
      <td className="w-[250px]">
        {get(element, ["pdf", "mediaItemUrl"], null) && (
          <Text
            className={styles.linkFloorPlans}
            target="_blank"
            href={get(element, ["pdf", "mediaItemUrl"], null)}
            download={`${get(element, ["pdf", "title"], null)}`}
            component="a"
          >
            {`${get(element, ["pdf", "title"], null)}.pdf`}
          </Text>
        )}
      </td>
      <td>
        {element.bedbath}
        {element.den ? "+Den" : ""}
      </td>
      <td>{element.acSqft}</td>
      <td>{element.totalSqft}</td>
    </tr>
  ));

  return (
    <Box className={styles.gridContendCollapse}>
      <Box />
      <Box className={styles.containerConted}>
        <Box className={styles.containerTable}>
          <Table>
            <thead>
              <tr>
                {columns.map((thItem, index) => (
                  <th className="text-black" key={index}>
                    <Text className={styles.textTable} component="span">
                      <strong>{thItem.title}</strong>
                    </Text>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
};

export default TableContendCollapse;
