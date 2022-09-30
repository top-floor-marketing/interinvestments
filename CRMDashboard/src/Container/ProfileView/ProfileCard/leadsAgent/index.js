import { Box, createStyles, Text, ScrollArea, Skeleton, Paper } from "@mantine/core";
import { useQueryHelper } from "../../../../GraphqlClient/useRequest";
import { GET_LEADS_LIST_FOR_AGENT } from "../../../../GraphqlClient/leads.gql";
import get from 'lodash/get';
import map from 'lodash/map';
import { USER_ROLES_CRM } from "../../../../GlobalStore/utils";

const useStyles = createStyles((theme, _params) => ({
    container: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        gap: theme.other.spacing.p4,
        'h4': {
            margin: 0
        }
    },
    leadsScroll: {
        maxHeight: "250px",
        width: "100%",
    },
    leadsContainer: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: theme.other.spacing.p4,
    },
    itemLead: {
        display: "flex",
        flexDirection: "row",
        width: "calc(100% - 12px)",
        backgroundColor: theme.colors.gray[0]
    }
}));

const LeadsAgent = ({ idAgent = null }) => {

    const { classes } = useStyles({ idAgent });

    const { isLoading, data } = useQueryHelper({
        name: "get-leads-list-agent",
        gql: GET_LEADS_LIST_FOR_AGENT,
        variables: {
            agentId: idAgent,
            agentType: USER_ROLES_CRM.AGENT
        },
    });

    return (
        <Skeleton visible={isLoading} className={classes.container}>
            <Box className={classes.container}>
                <Text transform="capitalize" component="h4">Leads</Text>
                <Box component={ScrollArea} className={classes.leadsScroll}>
                    <Box className={classes.leadsContainer}>
                        {
                            map(get(data, ["dataAgent", "0", "statuses"], [])).map((val, index) => {
                                return (
                                    <Paper key={index} className={classes.itemLead}>
                                        {index}
                                    </Paper>
                                )
                            })
                        }
                    </Box>
                </Box>
            </Box>
        </Skeleton>
    );
};

export default LeadsAgent;
