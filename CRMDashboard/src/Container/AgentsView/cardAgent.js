import { memo } from 'react';
import { Box, createStyles, Paper, Avatar, Text, Button } from "@mantine/core";
import { Briefcase, Phone, Link, Mail } from "tabler-icons-react";

import { CustomIconTooltip } from '../../Component/ActionButtons';

import { urlShareAgent } from './hooks/utils.service';

import get from 'lodash/get';

const useStyles = createStyles((theme, _params) => ({
    container: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        padding: 0
    },
    paperInfo: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: theme.other.spacing.p4,
        padding: theme.other.spacing.p4
    },
    boxFrontPage: {
        position: "absolute",
        backgroundImage: theme.fn.gradient({ from: theme.colors.secondary[0], to: theme.colors.secondary[7], deg: 50 }),
        height: "50px",
        width: "100%",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
    },
    avatar: {
        alignSelf: "center",
    },
    textName: {
        textAlign: "center",
        fontSize: "16px",
        alignSelf: "center",
        fontWeight: 600
    },
    textInfo: {
        fontWeight: 300,
        fontSize: "14px",
    },
    link: {
        color: theme.colors.primary[0],
        '&:hover': {
            color: theme.colors.primary[9],
        }
    },
    boxInfo: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        gap: theme.other.spacing.p2,
        justifyItems: "center",
        alignItems: "center"
    },
    buttonDetails: {
        marginTop: "auto",
        alignSelf: "center"
    }
}));

const CardAgent = (props) => {
    const { cx, classes } = useStyles();

    const fullName = get(props, ["firstName"], "").concat(" ").concat(get(props, ["lastName"], ""));
    const idAgentLink = urlShareAgent(get(props, ["databaseId"], ""));

    return (
        <Paper className={classes.container}>
            <Box className={classes.boxFrontPage} />
            <Box className={classes.paperInfo}>
                <Avatar
                    radius="_40px"
                    size="60px"
                    src={get(props, ["avatarProfile"], "")}
                    className={classes.avatar}
                />
                <Text className={classes.textName} lineClamp={1} title={fullName}>
                    {
                        fullName
                    }
                </Text>
                <Box className={classes.boxInfo}>

                    <CustomIconTooltip size={22} color="primary" labelTooltip={get(props, ["position"], "")}>
                        <Briefcase />
                    </CustomIconTooltip>
                    <Text className={classes.textInfo} lineClamp={1}>
                        {
                            get(props, ["position"], "")
                        }
                    </Text>
                </Box>
                <Box className={classes.boxInfo}>

                    <CustomIconTooltip size={22} color="primary" labelTooltip={get(props, ["phone"], "")}>
                        <Phone />
                    </CustomIconTooltip>
                    <Text className={classes.textInfo} lineClamp={1}>
                        {
                            get(props, ["phone"], "")
                        }
                    </Text>
                </Box>
                <Box className={classes.boxInfo}>
                    <CustomIconTooltip size={22} color="primary" labelTooltip={get(props, ["email"], "")}>
                        <Mail />
                    </CustomIconTooltip>
                    <Text className={classes.textInfo} lineClamp={1}>
                        {
                            get(props, ["email"], "")
                        }
                    </Text>
                </Box>
                <Box className={classes.boxInfo}>
                    <CustomIconTooltip size={22} color="primary" labelTooltip={idAgentLink}>
                        <Link />
                    </CustomIconTooltip>
                    <Text component='a' href={idAgentLink} target="_blank" className={cx(classes.textInfo, classes.link)} lineClamp={1}>
                        Share profile
                    </Text>
                </Box>
                <Box className={classes.buttonDetails}>
                    <Button onClick={() => props.openModal({ open: true, idAgent: parseInt(get(props, ["databaseId"], 0)) })}>Details</Button>
                </Box>
            </Box>
        </Paper>
    )
};

export default memo(CardAgent);
