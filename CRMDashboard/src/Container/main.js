import { Box, createStyles, Text, Button } from "@mantine/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoading } from "../Store/userSlice";

import { CRM_ROUTES } from "../Route/routes";

import useIsLogin from "../Hooks/useIsLogin";

const useStyles = createStyles((theme, _params, getRef) => ({
  mainContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "flex-column",
    minHeight: "100vh",
    backgroundColor: theme.colors.gray[0],
  },
}));

const ContainerMain = () => {
  const { classes } = useStyles();
  const { route } = useSelector((state) => state.user);
  const { isVerifyLogin } = useIsLogin();
  if (isVerifyLogin) {
    return null;
  }
  return (
    <Box className={classes.mainContainer}>
      {/*    {(() => {
        switch (msgType) {
          case "resolved":
            return (
              <div className="msg-resolved">
                Your Ticker is Resolved Successfully
              </div>
            );
          case "pending":
            return <div className="msg-resolved">Your Ticker is pending</div>;
          case "closed":
            return (
              <div className="msg-closed">
                Your Ticker is Closed Successfully
              </div>
            );
          default:
            return (
              <div className="msg-empty">
                The Ticket Status is unknown. Check back later.
              </div>
            );
        }
      })()} */}
    </Box>
  );
  /* return (
    <Box className={classes.container}>
      <Text size="lg">ROUTE: {JSON.stringify(route)}&nbsp;&nbsp;&nbsp;</Text>
      <Text size="lg">VERIFY: {JSON.stringify(isVerifyLogin)}</Text>
      <Box className={classes.routes}>
        {CRM_ROUTES.map((val, index) => {
          return <Button key={index}>{val.name}</Button>;
        })}
      </Box>
    </Box>
  ); */
};

export default ContainerMain;
