import React from 'react'
// mantine
import { Box, Table, Text } from '@mantine/core';
// css
import styles from './styles.cl.module.scss'

const TableContendCollapse = ({ data, columns }) => {
    const rows = data.map((element, index) => (
        <tr key={index}>
            <td className='w-[110px]'>
                {element.name}
            </td>
            <td className='w-[250px]'>
                <Text
                    className={styles.linkFloorPlans}
                    target="_blank"
                    href={element.pdf.mediaItemUrl}
                    download={`${element.pdf.title}`}
                    component='a'
                >
                    {`${element.pdf.title}.pdf`}
                </Text>
            </td>
            <td>{element.bedbath}{(element.den) ? '+Den' : ''}</td>
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
                                {
                                    columns.map((thItem, index) => (
                                        <th key={index}>
                                            <Text className={styles.textTable} component='span'>
                                                <strong>
                                                    {thItem.title}
                                                </strong>
                                            </Text>
                                        </th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </Table>
                </Box>
            </Box>
        </Box>
    )
}

export default TableContendCollapse