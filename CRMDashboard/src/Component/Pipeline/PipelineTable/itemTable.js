import PropTypes from 'prop-types';
import { useState } from 'react';
import { Card, createStyles, Avatar, Text, Box, Accordion } from "@mantine/core";

const useStyles = createStyles((theme, _params, getRef) => ({
    container: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        gap: theme.other.spacing.p5,
        alignItems: "center",
        padding: theme.other.spacing.p5,
        justifyContent: "space-between"
    },
    avatarContainer: {
        width: "100px",
        display: "flex",
        flexDirection: "column",
        height: "auto"
    },
    avatar: {
        backgroundColor: theme.colors.gray[9],
        ".mantine-Avatar-placeholder": {
            color: theme.colors.black[0]
        }
    },
    chevronContainer: {
        width: "100px",
        display: "flex",
        flexDirection: "column",
        height: "auto"
    },
    accordion: {
        backgroundColor: theme.colors.white[0],
        borderRadius: "10px",
        ".mantine-Accordion-control": {
            borderRadius: "10px",
            color: theme.fn.rgba(theme.colors.black[0], 1),
            "&:hover": {
                backgroundColor: theme.fn.rgba(theme.colors.gray[0], 0.6),
            }
        }
    }
}));

const ItemTable = ({ id, imageUrl, name, phoneNumber, email, key }) => {
    const [isActive, setIsActive] = useState(false);
    const { classes } = useStyles();

    const AccordionInfo = () => {
        return (
            <Box className={classes.container}>
                <Box className={classes.avatarContainer}>
                    <Avatar radius="xl" className={classes.avatar}>
                        JD
                    </Avatar>
                </Box>
                <Text transform="capitalize" align="left" size="sm">{name}</Text>
                <Text transform="capitalize" align="left" size="sm">{phoneNumber}</Text>
                <Text transform="capitalize" align="left" size="sm">{email}</Text>
            </Box>
        )
    }
    return (
        <Accordion iconPosition="right" className={classes.accordion}>
            <Accordion.Item label={<AccordionInfo />}>
                Colors, fonts, shadows and many other parts are customizable to fit your design needs
            </Accordion.Item>
        </Accordion>

    )
}

ItemTable.prototype = {
    id: PropTypes.string,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
    key: PropTypes.number
}

export default ItemTable;