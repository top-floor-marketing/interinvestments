
// https://javascript.plainenglish.io/create-a-trello-clone-with-react-6eca324f155a

import { createStyles, Box, ScrollArea } from '@mantine/core';

import { useElementSize } from '@mantine/hooks';

const useStyles = createStyles((theme, _params) => ({
    container: {
        width: "100%",
        height: "500px",
        minHeight: "300px",
        display: "flex",
        flexDirection: "column",
    },
    containerColumns: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        gap: theme.other.spacing.p5,
    },
    itemsTest: {
        minWidth: "200px",
        minHeight: "600px",
        backgroundColor: theme.colors.primary[5]
    }
}));

const DndColumn = () => {

    const { classes } = useStyles();

    const { ref, width, height } = useElementSize();

    return (
        <Box ref={ref} className={classes.container}>
            <ScrollArea style={{ width: width, height: height }} offsetScrollbars>
                <Box className={classes.containerColumns}>
                    {
                        new Array(6).fill(0).map((val, index) => {
                            return (
                                <Box key={index} className={classes.itemsTest}>
                                    {index}
                                </Box>
                            )
                        })
                    }
                </Box>
            </ScrollArea>
        </Box>
    )
}

export default DndColumn;