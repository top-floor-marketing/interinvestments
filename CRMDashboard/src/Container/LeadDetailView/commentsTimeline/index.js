import { useState } from "react";
import {
  Box,
  Paper,
  createStyles,
  Skeleton,
  Text,
  Timeline,
  Textarea,
  ScrollArea,
  Group,
} from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";

import { AdjustmentsAlt, MessageDots, Send } from "tabler-icons-react";

import get from "lodash/get";
import isEmpty from "lodash/isEmpty";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";

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
    ".mantine-Paper-root": {
      width: "100% !important",
    },
  },
  timeLine: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  boxItem: {
    width: "90%",
    display: "flex",
    maxHeight: "150px",
    flexDirection: "column",
    gap: theme.other.spacing.p4,
  },
  iconSend: {
    ".icon-tabler": {
      cursor: 'pointer !important',
      color: `${theme.colors.primary[6]} !important`,
      "&:hover": {
        color: `${theme.colors.primary[8]} !important`,
      },
    },
  },
}));

const CommentsTimeline = ({ isSkeleton, dataLead, isLoading, allComments }) => {
  const { classes } = useStyles();

  const [valueComment, setValueComment] = useState(
      ""
  );

  const getTimeDiff = (time) => {
    if (isEmpty(time)) return null;
    const currentUtc = dayjs().utc().format();
    return `${dayjs(time).fromNow(currentUtc)} ago`;
  };

  const getCommentFormat = (val) => {
    return get(val, ["comments"], "").replace(/(<([^>]+)>)/gi, "");
  };

  const saveComment = () => {
    console.log("saveComment ", valueComment);
  }

  return (
    <Skeleton visible={isSkeleton} className={classes.cardContainer}>
      <Paper className={classes.cardContainer}>
        <Box className={classes.timeLine} component={ScrollArea}>
          {allComments.length ? (
            <Timeline active={allComments.length} bulletSize={24} lineWidth={3}>
              {allComments.map((val, index) => (
                <Timeline.Item
                  key={index}
                  color={get(val, ["timeline", "color"], "gray")}
                  bullet={<AdjustmentsAlt size={16} />}
                  title={
                    <Text
                      weight="bold"
                      size="16px"
                      color={get(val, ["timeline", "color"], "gray")}
                      lineClamp={1}
                      title={get(val, ["comments"], "")}
                    >
                      {get(val, ["timeline", "status"], "")}
                    </Text>
                  }
                >
                  <Box className={classes.boxItem} component={ScrollArea}>
                    {getCommentFormat(val).length > 0 && (
                      <Group spacing="0.5rem">
                        <MessageDots size={16} />
                        <Text
                          lineClamp={5}
                          size="14px"
                          title={getCommentFormat(val)}
                        >
                          {getCommentFormat(val)}
                        </Text>
                      </Group>
                    )}
                    <Group spacing="0.5rem">
                      <Text color="dark" size="12px">
                        {getTimeDiff(get(val, ["date"], ""))}
                      </Text>
                    </Group>
                  </Box>
                </Timeline.Item>
              ))}
            </Timeline>
          ) : null}
        </Box>
        <Textarea
          placeholder="Add comment"
          minRows={1}
          disabled={isSkeleton || isLoading}
          maxRows={3}
          className={classes.iconSend}
          rightSection={<Send size={24} onClick={() => saveComment()} />}
          value={valueComment}
          onChange={(event) => setValueComment(event.target.value)}
          onKeyDown={getHotkeyHandler([["Enter", saveComment]])}
        />
      </Paper>
    </Skeleton>
  );
};

export default CommentsTimeline;
