import { useState, useRef } from "react";
import { Box, createStyles, Skeleton, Button, Paper, Text } from "@mantine/core";
import { useQueryHelper } from "../../GraphqlClient/useRequest";
import { ADMIN_GET_ALL_AGENTS } from "../../GraphqlClient/agentProfile.gql";

import TransferAgent from "./TransferAgent";
import AvatarText from "../AvatarText";

import { User, Mail, ArrowRight, ArrowLeft } from "tabler-icons-react";

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
        leadInfoContainer: {
            width: "100%",
            minHeight: "70px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: theme.other.spacing.p4,
            backgroundColor: theme.colors.gray[0],
            marginBottom: theme.other.spacing.p4,
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
        },
        itemsTextContainer: {
            display: "flex",
            flexDirection: "row",
            gap: theme.other.spacing.p2,
            alignItems: "center",
            '.icon-tabler': {
                color: `${theme.colors.dark[0]}`
            },
            [`${theme.fn.smallerThan(700)}`]: {
                flexDirection: "column",
                width: "100% !important",
                flex: "1 !important"
            },
        },
        text: {
            fontWeight: "300 !important",
            margin: "0px !important",
            fontSize: "12px",
            [`${theme.fn.largerThan(1600)}`]: {
                fontSize: "14px",
            }
        },
        textLeadTitle: {
            fontWeight: 700,
            fontSize: "18px",
            minWidth: "50px",
            height: "fit-content",
        },
    };
});

const BodyContentTransfer = ({ allAgentsStatus, leadInfo }) => {

    const { classes } = useStyles();

    const transferAllAgentRef = useRef(null);
    const transferSelectedAgentRef = useRef(null);

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

    const emptyFilters = () => {
        setCheckTransferList([]);
        setCheckSelectedList([]);
        if (transferAllAgentRef.current && transferSelectedAgentRef.current) {
            transferAllAgentRef.current.clearSearchText()
            transferSelectedAgentRef.current.clearSearchText()
        }
    }

    const onChangeTransferAgent = () => {
        const find = findIndex(dataAllAgents, (e) => e.value === checkTransferList[0])
        setDataAgentSelected([...dataAgentSelected].concat(dataAllAgents[find]))
        setDataAllAgents([...dataAllAgents].filter((e) => e.value !== checkTransferList[0]));
        emptyFilters();
    }

    const onChangeSelectedAgent = () => {
        const find = findIndex(dataAgentSelected, (e) => e.value === checkSelectedList[0])
        setDataAllAgents([...dataAllAgents].concat(dataAgentSelected[find]))
        setDataAgentSelected([...dataAgentSelected].filter((e) => e.value !== checkSelectedList[0]));
        emptyFilters();
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
                <Paper className={classes.leadInfoContainer}>
                    <Text
                        component="span"
                        lineClamp={2}
                        className={classes.textLeadTitle}
                    >
                        Lead:
                    </Text>
                    <AvatarText
                        src={null}
                        firstName={leadInfo.firstName}
                        lastName={leadInfo.lastName}
                    />
                    <Box className={classes.itemsTextContainer}>
                        <User
                            size={24}
                        />
                        <Text
                            component="span"
                            lineClamp={2}
                            className={classes.text}
                            title={`Lead name:\n${leadInfo.firstName} ${leadInfo.lastName}`}
                        >
                            {`${leadInfo.firstName} ${leadInfo.lastName}`}
                        </Text>
                    </Box>
                    <Box className={classes.itemsTextContainer}>
                        <Mail
                            size={24}
                        />
                        <Text
                            lineClamp={2}
                            className={classes.text}
                            title={`Lead email:\n${leadInfo.email}`}
                        >
                            {leadInfo.email}
                        </Text>
                    </Box>
                </Paper>
                <Box className={classes.transfers}>
                    <TransferAgent textTitle="Agents available: " ref={transferAllAgentRef} data={dataAllAgents} checkList={checkTransferList} checkAgent={onCheckTransferAgent} />
                    <Box className={classes.buttonsContainer}>
                        <Button onClick={() => onChangeTransferAgent()} variant="outline" color="primary" disabled={!checkTransferList.length}>
                            <ArrowRight />
                        </Button>
                        <Button onClick={() => onChangeSelectedAgent()} variant="outline" color="primary" disabled={!checkSelectedList.length}>
                            <ArrowLeft />
                        </Button>
                    </Box>
                    <TransferAgent textTitle="Assigned agents: " ref={transferSelectedAgentRef} data={dataAgentSelected} checkList={checkSelectedList} checkAgent={onCheckSelectedAgent} />
                </Box>
            </Box>
        </Skeleton>
    )

}

export default BodyContentTransfer;