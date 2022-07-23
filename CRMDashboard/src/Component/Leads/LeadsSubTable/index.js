import PropTypes from 'prop-types';
import { Table, createStyles, Box, Avatar, Text, Badge, useMantineTheme } from '@mantine/core';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const useStyles = createStyles((theme, _params, getRef) => ({
    container: {
        marginBottom: theme.other.spacing.p4,
        "th": {
            borderBottom: "1px solid #83837C !important",
            paddingBottom: `${theme.other.spacing.p2} !important`,
        },
    },
    tbody: {
        backgroundColor: theme.colors.white[1],
        minHeight: "50px",
        borderRadius: "10px",
    },
    trBody: {
        "&:hover": {
            backgroundColor: theme.colors.white[0],
            boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
            [`& .${getRef('tdRow')}`]: {
                border: `1px solid ${theme.colors.white[0]} !important`,
            } 
        }
    },
    avatarContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        height: "auto",
        gap: theme.other.spacing.p3
    },
    avatar: {
        backgroundColor: theme.colors.gray[9],
        ".mantine-Avatar-placeholder": {
            color: theme.colors.black[0]
        }
    },
    textLead: {
        marginTop: "auto",
        marginBottom: "auto"
    },
    tdRow: {
        border: `1px solid ${theme.colors.white[1]} !important`,
        ref: getRef('tdRow')
    }
}));

const STATUS = {
    cancel: "error",
    ongoing: "success",
    dealing: "primary"
}

const elements = [
    {
        position: 6, listing: {
            photo: "https://interinvestments.bytfm.com/wp-content/uploads/2022/04/Berkleigh_Int_Amenity_ClubroomLounge_DiningTable_June2018-2.jpg",
            name: "Tampa"
        }, date: dayjs('2022-06-21 15:00:00').fromNow(), service: 'New Development', status: 'cancel'
    },
    {
        position: 70,
        listing: {
            photo: "https://dullesarea.com/wp-content/uploads/2018/03/Coming-Soon.jpeg",
            name: "Miami"
        }
        , date: dayjs('2022-06-20 12:40:00').fromNow(), service: 'New home', status: "dealing"
    },
    {
        position: 7,
        listing: {
            photo: "https://interinvestments.bytfm.com/wp-content/uploads/2022/05/middle-services.jpg",
            name: "Sun Valley Road"
        }
        , date: dayjs('2022-06-20 10:25:00').fromNow(), service: 'New home', status: "ongoing"
    },
    {
        position: 39,
        listing: {
            photo: "https://interinvestments.bytfm.com/wp-content/uploads/2022/05/what-we-do-services.jpg",
            name: "Saints Alley"
        }
        , date: dayjs('2022-05-01').fromNow(), service: 'Rental', status: 'cancel'
    },
];

const LeadsSubTable = ({ id }) => {
    const { classes } = useStyles();
    const theme = useMantineTheme();
    const rows = elements.map((element) => (
        <tr key={element.position} className={classes.trBody}>
            <td className={classes.tdRow}>
                <Box className={classes.avatarContainer}>
                    <Avatar src={element.listing.photo} radius="xl" className={classes.avatar} />
                    <Text className={classes.textLead}>{element.listing.name}</Text>
                </Box>
            </td>
            <td className={classes.tdRow}>
                {element.service}
            </td>
            <td className={classes.tdRow}>{element.date}</td>
            <td className={classes.tdRow}>
                <Badge variant="gradient" gradient={{
                    from: theme.colors[STATUS[element.status]][3],
                    to: theme.colors[STATUS[element.status]][9]
                }}>
                    {element.status}
                </Badge>
            </td>
        </tr>
    ));

    return (
        <Table verticalSpacing="sm" className={classes.container}>
            <thead>
                <tr>
                    <th>Listing</th>
                    <th>Service</th>
                    <th>Date</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody className={classes.tbody}>
                {rows}
            </tbody>
        </Table>
    )
}

LeadsSubTable.prototype = {
    id: PropTypes.string,
}

export default LeadsSubTable;