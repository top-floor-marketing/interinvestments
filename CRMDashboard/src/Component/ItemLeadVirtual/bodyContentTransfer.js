import { useState } from "react";
import { Group, Box, createStyles, Text, Checkbox, Skeleton, TransferList } from "@mantine/core";
import { useQueryHelper } from "../../GraphqlClient/useRequest";
import { ADMIN_GET_ALL_AGENTS } from "../../GraphqlClient/agentProfile.gql";
import AvatarText from "../AvatarText";

import findIndex from 'lodash/findIndex';
import get from 'lodash/get';

const useStyles = createStyles((theme, _params) => {
    return {
        container: {
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: theme.other.spacing.p4,
            minHeight: "300px"
        },
    };
});

const BodyContentTransfer = ({ allAgentsStatus, isOfficeLead }) => {

    const { classes } = useStyles();

    const [allAgentTransferData, setAllAgentsTransferData] = useState([[], []]);

    // console.log("allAgentsStatus ", allAgentsStatus)

    const onChangeTransfer = (e) => {
        console.log('e ', e)
    }

    const { isLoading, isSuccess } = useQueryHelper({
        name: "admin-get-all-agents",
        gql: ADMIN_GET_ALL_AGENTS,
        config: {
            cacheTime: 5 * 60 * 10000, // 10 minutes
            onSuccess: (response) => {
                const dataFormat = get(response, ["dataAgent"], []).map((val) => ({
                    value: get(val, ["databaseId"], 0),
                    image: get(val, ["avatarProfile"], null),
                    label: get(val, ["firstName"], "").concat(` ${get(val, ["lastName"], "")}`),
                    email: get(val, ["email"], []),
                    isCheck: findIndex(allAgentsStatus, (e) => e?.databaseId === val?.databaseId) > -1,
                }
                ));
                setAllAgentsTransferData([dataFormat, []]);
            },
        },
    });

    const ItemComponent = ({
        data,
        selected,
    }) => (
        <Group noWrap spacing="lg" style={{ justifyItems: "center", alignItems: "center"}}>
            <AvatarText firstName={data.label} src={data.image} />
            <Box style={{ flex: 1 }}>
                <Text size="sm" weight={500}>
                    {data.label}
                </Text>
                <Text size="xs" color="dimmed" weight={400}>
                    {data.email}
                </Text>
            </Box>
            <Checkbox checked={selected} onChange={() => {}} tabIndex={-1} sx={{ pointerEvents: 'none' }} />
        </Group>
    );

    return (
        <Skeleton visible={isLoading || !isSuccess}>
            <Box className={classes.container}>
                {
                    get(allAgentTransferData, ["0"], []).length
                    &&
                    <TransferList
                        value={allAgentTransferData}
                        onChange={setAllAgentsTransferData}
                        searchPlaceholder="Search agents..."
                        nothingFound=""
                        titles={['Agents to transfer', 'Agents assigned']}
                        listHeight={400}
                        breakpoint="sm"
                        itemComponent={ItemComponent}
                        radius={0}
                        showTransferAll={false}
                        filter={(query, item) =>
                            item.label.toLowerCase().includes(query.toLowerCase().trim()) ||
                            item.email.toLowerCase().includes(query.toLowerCase().trim())
                        }
                    />
                } 

            </Box>
        </Skeleton>
    )

}

export default BodyContentTransfer;