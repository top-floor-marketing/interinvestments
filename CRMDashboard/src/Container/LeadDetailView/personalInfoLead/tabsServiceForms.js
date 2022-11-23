import React from "react";
// mantine dev
import { createStyles, Tabs, Box, ScrollArea, Text } from "@mantine/core";

import TabsServiceFormsBody from "./tabsServiceFormsBody";

const useStyles = createStyles((theme, _params) => ({
    tabBody: {
        width: "100%",
        minHeight: '200px',
        maxHeight: "800px",
        backgroundColor: theme.colors.gray[0]
    }
}));

const TabsServiceForms = ({ arrayServicePost }) => {
    const { classes } = useStyles();
    return (
        <Tabs defaultValue={arrayServicePost[0] + '_0'}>

            <Tabs.List>
                {
                    arrayServicePost.map((e, index) => (
                        <Tabs.Tab
                            key={e}
                            value={e + '_' + index}

                        >
                            <Text id={'tab_' + e + '_' + index}>
                                Service form {index + 1}
                            </Text>

                        </Tabs.Tab>
                    ))
                }
            </Tabs.List>

            {
                arrayServicePost.map((e, index) => (
                    <Tabs.Panel style={{ paddingTop: "1rem" }} key={index} value={e + '_' + index} pt="xs">
                        <Box component={ScrollArea} className={classes.tabBody} >
                            <TabsServiceFormsBody idService={e} tabKey={'tab_' + e + '_' + index} />
                        </Box>
                    </Tabs.Panel>
                ))
            }

        </Tabs>
    );
};


export default TabsServiceForms;
