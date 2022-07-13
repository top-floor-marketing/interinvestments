import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Card, createStyles, Avatar, Text, Box, ActionIcon } from "@mantine/core";
import { useElementSize } from '@mantine/hooks';
import { ChevronUp } from 'tabler-icons-react';

import { useSpring, animated } from "react-spring";

import LeadsSubTable from '../LeadsSubTable';

import classNames from 'classnames';

const useStyles = createStyles((theme, _params, getRef) => ({
    animateContainer: {
        marginBottom: theme.other.spacing.p5
    },
    container: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: theme.other.spacing.p5,
    },
    leadRow: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        gap: theme.other.spacing.p5,
        alignItems: "center",
        justifyContent: "space-between"
    },
    avatarContainer: {
        width: "100px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        height: "auto"
    },
    avatar: {
        backgroundColor: theme.colors.gray[9],
        ".mantine-Avatar-placeholder": {
            color: theme.colors.black[0]
        }
    },
    infoContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        height: "auto",
        gap: theme.other.spacing.p5,
        justifyContent: "start",
        /* [theme.fn.smallerThan('sm')]: {
            fontSize: theme.fontSizes.sm,
        }, */
    },
    textInfo: {
        width: "auto",
        width: "33.33%",
    },
    textName: {
        wordBreak: "break-word"
    },
    chevronContainer: {
        width: "100px",
        display: "flex",
        flexDirection: "row",
        height: "auto",
        justifyContent: "flex-end"
    },
    cardTableContainer: {
        marginLeft: "auto",
        marginRight: "auto",
        width: "96%",
        display: "flex",
        flexDirection: "column",
        padding: "0 !important"
    }
}));

const ItemTable = ({ id, name, phoneNumber, email, key }) => {
    const { classes } = useStyles();
    const [active, setActive] = useState(false);
    const { ref, height } = useElementSize();

    const [contentHeight, setContentHeight] = useState(height);

    // Animations
    const expand = useSpring({
        config: { friction: 35 },
        height: active ? `${contentHeight}px` : `${height}px`
    });
    const spin = useSpring({
        config: { friction: 40 },
        transform: active ? "rotate(180deg)" : "rotate(0deg)"
    });

    useEffect(() => {
        //Sets initial height
        setContentHeight(height);
        //Adds resize event listener
        window.addEventListener("resize", setContentHeight(height));
        // Clean-up
        return window.removeEventListener("resize", setContentHeight(height));
    }, [height]);

    return (
        <animated.div key={key} style={expand} className={classes.animateContainer}>
            <Card className={classes.container} ref={ref} style={{ minHeight: "10px" }} >
                <Box className={classes.leadRow}>
                    <Box className={classes.infoContainer}>
                        <Text className={classNames(classes.textInfo, classes.textName)} transform="capitalize" align="left" size="sm">{name}</Text>
                        <Text className={classes.textInfo} transform="capitalize" align="left" size="sm">{email}</Text>
                        {
                            (phoneNumber) && 
                            <Text className={classes.textInfo} transform="capitalize" align="left" size="sm">{phoneNumber}</Text>
                        }
                    </Box>
                    <Box className={classes.chevronContainer}>
                        <animated.div style={spin}>
                            <ActionIcon size="lg" variant="outline" onClick={() => setActive(!active)}>
                                <ChevronUp />
                            </ActionIcon>
                        </animated.div>
                    </Box>
                </Box>
                {
                    active &&
                    <Card className={classes.cardTableContainer}>
                        <LeadsSubTable />
                    </Card>
                }
            </Card>
        </animated.div>
    )
}

ItemTable.prototype = {
    id: PropTypes.string,
    name: PropTypes.string,
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
    key: PropTypes.number
}

export default ItemTable;