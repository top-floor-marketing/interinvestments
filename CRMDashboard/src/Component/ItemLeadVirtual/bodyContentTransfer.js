import { useState } from "react";
import { Box, createStyles, Skeleton, Button } from "@mantine/core";
import { useQueryHelper } from "../../GraphqlClient/useRequest";
import { ADMIN_GET_ALL_AGENTS } from "../../GraphqlClient/agentProfile.gql";

import TransferAgent from "./TransferAgent";

import { ArrowRight, ArrowLeft } from "tabler-icons-react";

import findIndex from 'lodash/findIndex';
import get from 'lodash/get';

const useStyles = createStyles((theme, _params) => {
    return {
        container: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: theme.other.spacing.p4,
            height: "400px",
            paddingBottom: theme.other.spacing.p4,
        },
        transfers: {
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            gap: theme.other.spacing.p4,
        },
        buttonsContainer: {
            width: "120px",
            height: "120px",
            display: "flex",
            flexDirection: "column",
            gap: theme.other.spacing.p4,
            padding: theme.other.spacing.p2,
            alignSelf: "center",
            '.icon-tabler': {
                color: "white",
                width: "20px"
            }
        }
    };
});

const BodyContentTransfer = ({ allAgentsStatus }) => {

    const { classes } = useStyles();

    const [isSkeleton, setIsSkeleton] = useState(true);

    const [dataAllAgents, setDataAllAgents] = useState([]);
    const [dataAgentSelected, setDataAgentSelected] = useState(allAgentsStatus);
    const [checkTransferList, setCheckTransferList] = useState([]);
    const [checkSelectedList, setCheckSelectedList] = useState([]);

    const onCheckTransferAgent = (val) => {
        if (val === checkTransferList[0])
            setCheckTransferList([]);
        else
            setCheckTransferList([val]);
    }

    const onCheckSelectedAgent = (val) => {
        if (val === checkSelectedList[0])
            setCheckSelectedList([]);
        else
            setCheckSelectedList([val]);
    }

    const onChangeTransferAgent = () => {
        const find = findIndex(dataAllAgents, (e) => e.value === checkTransferList[0])
        setDataAgentSelected([...dataAgentSelected].concat(dataAllAgents[find]))
        setDataAllAgents([...dataAllAgents].filter((e) => e.value !== checkTransferList[0]));
        setCheckTransferList([]);
        setCheckSelectedList([]);
    }

    const onChangeSelectedAgent = () => {
        const find = findIndex(dataAgentSelected, (e) => e.value === checkSelectedList[0])
        setDataAllAgents([...dataAllAgents].concat(dataAgentSelected[find]))
        setDataAgentSelected([...dataAgentSelected].filter((e) => e.value !== checkSelectedList[0]));
        setCheckTransferList([]);
        setCheckSelectedList([]);
    }

    useQueryHelper({
        name: "admin-get-all-agents-transfer",
        gql: ADMIN_GET_ALL_AGENTS,
        config: {
            cacheTime: 5 * 60 * 10000, // 10 minutes
            onSuccess: (response) => {
                const dataFormat = get(response, ["dataAgent"], []).map((val) => ({
                    value: get(val, ["databaseId"], 0),
                    image: get(val, ["avatarProfile"], null),
                    label: get(val, ["firstName"], "").concat(` ${get(val, ["lastName"], "")}`),
                    email: get(val, ["email"], []),
                }
                ));
                setDataAllAgents(dataFormat);
                setIsSkeleton(false);
            },
        },
    });

    return (
        <Skeleton visible={isSkeleton}>
            <Box className={classes.container}>
                <Box className={classes.transfers}>
                    <TransferAgent data={dataAllAgents} checkList={checkTransferList} checkAgent={onCheckTransferAgent} />
                    <Box className={classes.buttonsContainer}>
                        <Button onClick={() => onChangeTransferAgent()} variant="outline" color="primary" disabled={!checkTransferList.length}>
                            <ArrowRight />
                        </Button>
                        <Button onClick={() => onChangeSelectedAgent()} variant="outline" color="primary" disabled={!checkSelectedList.length}>
                            <ArrowLeft />
                        </Button>
                    </Box>
                    <TransferAgent data={dataAgentSelected} checkList={checkSelectedList} checkAgent={onCheckSelectedAgent} />
                </Box>
            </Box>
        </Skeleton>
    )

}

export default BodyContentTransfer;