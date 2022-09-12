import { Box, Paper, createStyles, Skeleton, Text, Timeline, Textarea, ScrollArea, Group } from "@mantine/core";
import { AdjustmentsAlt, MessageDots } from "tabler-icons-react";

import get from 'lodash/get';
import isEmpty from "lodash/isEmpty";

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(utc);
dayjs.extend(relativeTime);

const useStyles = createStyles((theme, _params) => ({
    cardContainer: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: theme.shadows.sm,
        gap: theme.other.spacing.p4,
        width: "70%",
        [`${theme.fn.smallerThan(700)}`]: {
            width: "100%",
        },
        '.mantine-Paper-root': {
            width: "100% !important",
        }
    },
    timeLine: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%"
    },
    boxItem: {
        width: "90%",
        display: "flex",
        maxHeight: "150px",
        flexDirection: "column",
        gap: theme.other.spacing.p4,
    }
}));

const CommentsTimeline = ({ isSkeleton, dataLead, allComments }) => {
    const { classes } = useStyles();

    console.log("allComments", allComments)

    const getTimeDiff = (time) => {
        if (isEmpty(time)) return null;
        const currentUtc = dayjs().utc().format();
        return `${dayjs(time).fromNow(currentUtc)} ago`;
    }

    return (
        <Skeleton visible={isSkeleton} className={classes.cardContainer}>
            <Paper className={classes.cardContainer}>
                <Box className={classes.timeLine} component={ScrollArea}>
                    {
                        (allComments.length)
                            ?
                            <Timeline active={allComments.length} bulletSize={24} lineWidth={3} >
                                {
                                    allComments.map((val, index) => (
                                        <Timeline.Item
                                            key={index}
                                            color={get(val, ["timeline", "color"], "gray")}
                                            bullet={<AdjustmentsAlt size={16} />}
                                            title={
                                                <Text weight='bold' size="16px"  color={get(val, ["timeline", "color"], "gray")} size="md" lineClamp={1} title={get(val, ["comments"], "")}>
                                                    {get(val, ["timeline", "status"], "")}
                                                </Text>
                                            }
                                        >
                                            <Box className={classes.boxItem} component={ScrollArea}>
                                                <Group spacing="0.5rem">
                                                <MessageDots size={16} />
                                                    <Text lineClamp={5} size="14px" title={get(val, ["comments"], "")}>
                                                        {get(val, ["comments"], "").replace(/(<([^>]+)>)/ig, '')}
                                                    </Text>
                                                </Group>
                                                <Group spacing="0.5rem">
                                                    <Text color="dark" size="12px">
                                                        {getTimeDiff(get(val, ["date"], ""))}
                                                    </Text>
                                                </Group>

                                            </Box>


                                        </Timeline.Item>
                                    ))
                                }
                            </Timeline>
                            :
                            null

                    }
                </Box>
                <Textarea
                    placeholder="Add comment"
                    minRows={1}
                    disabled
                    maxRows={2}
                    rightSection={<MessageDots size={12} />}
                />
            </Paper>
        </Skeleton>
    );
};

export default CommentsTimeline;
