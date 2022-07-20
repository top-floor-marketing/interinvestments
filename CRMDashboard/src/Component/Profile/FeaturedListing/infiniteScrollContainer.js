import { forwardRef, StrictMode } from "react";
import { Box, createStyles } from "@mantine/core";
import List from 'rc-virtual-list';

const useStyles = createStyles((theme, _params) => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    boxShadow: theme.shadows.sm,
    gap: theme.other.spacing.p5,
    height: "100%",
    backgroundColor: theme.colors.gray[6]
  },
}));

const ListItemContainer = ({ id, height }, ref) => {
    return (
      <Box
        ref={ref}
        style={
          {
            height: "30px",
            paddingBottom: "1.25rem",
          }
        }
      >
        <ItemBox />
      </Box>
    );
  };

const ForwardItem = forwardRef(ListItemContainer);

const ItemBox = (props) => {
  const { classes } = useStyles();
  return (
    <Box className={classes.container}>

    </Box>
  )
}

const InfiniteScrollContainer = ({ data, isLoading, refetch }) => {

  const onScroll = (e) => {
    if (e.target && refetch !== undefined && !isLoading) {
      const { scrollTop, scrollHeight, clientHeight } = e.target;
      if (scrollHeight - scrollTop === clientHeight) {
        refetch();
      }
    }
  };

    return (
        <StrictMode>
          <List
          onScroll={onScroll}
          data={data}
          height={300}
          itemHeight={30}
          disabled={isLoading}
          itemKey="id"
        >
          {item => <ForwardItem {...item} />}
        </List>
        </StrictMode>
    )
}

export default InfiniteScrollContainer;