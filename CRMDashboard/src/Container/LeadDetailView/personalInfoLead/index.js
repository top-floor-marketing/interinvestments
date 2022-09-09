import { Box, Paper, createStyles, Skeleton, Text } from "@mantine/core";
import { Mail, User, c, Phone } from "tabler-icons-react";
import useGetPersonalInfoLead from "./useGetPersonalInfoLead";

import ChipStatusLead from "../../../Component/ItemLeadVirtual/chipStatusLead";

import { CustomIconTooltip } from "../../../Component/ActionButtons";

import get from 'lodash/get';
import isEmpty from "lodash/isEmpty";

const useStyles = createStyles((theme, _params) => ({
    cardContainer: {
        display: "flex",
        flexDirection: "column",
        minHeight: "300px",
        boxShadow: theme.shadows.sm,
        gap: theme.other.spacing.p4,
        width: "30%",
        gap: theme.other.spacing.p4,
        [`${theme.fn.smallerThan(700)}`]: {
            width: "100%",
        },
        '.mantine-Paper-root': {
            width: "100% !important",
        }
    },
    badgeStatus: {
        width: "auto",
        marginRight: "auto",
        padding: theme.other.spacing.p4,
        borderRadius: "10px"
    },
    textTitle: {
        fontSize: "16px",
        fontWeight: 500,
        margin: "0px !important",
    },
    infoItem: {
        display: "flex",
        flexDirection: "row",
        gap: theme.other.spacing.p4,
        alignItems: "center",
        'span': {
            fontSize: "12px",
            margin: "0px !important",
        }
    },
}));

const PersonalInfoLead = () => {
    const { classes } = useStyles();

    const { isLoading, refetch, isSkeleton, dataLead } = useGetPersonalInfoLead();

    console.log("dataLead ", dataLead);

    return (
        <Skeleton visible={isSkeleton} className={classes.cardContainer}>
            <Paper className={classes.cardContainer}>
                <ChipStatusLead className={classes.badgeStatus} status={get(dataLead, ["currentStatus", "name"], "")} />
                <Text transform="capitalize" className={classes.textTitle}>Contact info</Text>
                <Box className={classes.infoItem}>
                    <CustomIconTooltip size={24} color="secondary"
                        labelTooltip={`${get(dataLead, ["firstName"], "")} ${get(dataLead, ["lastName"], "")}`}
                    >
                        <User />
                    </CustomIconTooltip>
                    <Text transform="capitalize" component="span">{`${get(dataLead, ["firstName"], "")} ${get(dataLead, ["lastName"], "")}`}</Text>
                </Box>
                <Box className={classes.infoItem}>
                    <CustomIconTooltip size={24} color="secondary" labelTooltip={get(dataLead, ["email"], "")}>
                        <Mail />
                    </CustomIconTooltip>
                    <Text transform="capitalize" component="span">{get(dataLead, ["email"], "")}</Text>
                </Box>
                <Box className={classes.infoItem}>
                    <CustomIconTooltip size={24} color="secondary" labelTooltip={get(dataLead, ["phone"], "")}>
                        <Phone />
                    </CustomIconTooltip>
                    <Text transform="capitalize" component="span">{get(dataLead, ["phone"], "")}</Text>
                </Box>
                {
                    (!isEmpty(get(dataLead, ["otherPhone"], "")))
                    &&
                    <Box className={classes.infoItem}>
                        <CustomIconTooltip size={24} color="secondary" labelTooltip={get(dataLead, ["otherPhone", "0"], "")}>
                            <Phone />
                        </CustomIconTooltip>
                        <Text transform="capitalize" component="span">{get(dataLead, ["otherPhone", "0"], "")}</Text>
                    </Box>
                }
            </Paper>
        </Skeleton>
    );
};

export default PersonalInfoLead;
