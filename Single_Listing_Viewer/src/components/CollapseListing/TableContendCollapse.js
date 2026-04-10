import React from "react";
// mantine
import { Box, Table, Text, ActionIcon } from "@mantine/core";
import { Download } from 'tabler-icons-react';
// css
import styles from "./styles.cl.module.scss";

import get from "lodash/get";

const TableContendCollapse = ({ data, columns }) => {
  const rows = data.map((element, index) => (
    <tr key={index}>
      <td className="md:w-[250px] 2xl:w-[350px]">{element.name}</td>
      <td className="md:w-[300px] 2xl:w-[400px]">
        {get(element, ["pdf", "mediaItemUrl"], null) && (
          <Box className="flex flex-row gap-1">
            <Text
              className={styles.linkFloorPlans}
              target="_blank"
              href={get(element, ["pdf", "mediaItemUrl"], null)}
              download={`${get(element, ["pdf", "title"], null)}`}
              component="a"
            >
              {`${get(element, ["pdf", "title"], null)}.pdf`}
            </Text>
            <ActionIcon className="mr-auto flex flex-row" color="primary" onClick={() => window.open(get(element, ["pdf", "mediaItemUrl"], null), '_blank')}>
              <Download size={16}  className="mb-[10px]" />
            </ActionIcon>
          </Box>
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
          <Table className={styles.tableFloorplans}>
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
