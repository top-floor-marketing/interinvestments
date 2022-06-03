import { Box, Card, createStyles, Text, Avatar } from "@mantine/core";
import { useSpring, animated } from "react-spring";
// redux
import { useSelector } from "react-redux";

const useStyles = createStyles((theme, _params, getRef) => ({
  cardContainer: {
    width: "100%",
    // minHeight: "200px",
    boxShadow: theme.shadows.md,
    height: "100%",
  },
  boxContainer: {
    display: "flex",
    flexGrow: 1,
    width: "100%",
    height: "100%",
  },
  boxInfoProfile: {
    height: '100%',
    width: '50%'
  },
  containerAvatar: {
    display: "flex",
    flexGrow: 1,
    gap: '12px',
    justifyContent: 'left'
  },
  boxContainerHeader: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'space-between',
    marginBottom: '10px',
    'h2': {
      margin: '0px',
      fontSize: '21px',
    }
  }
}));

const ProfileCard = (props) => {
  const { infoUser } = useSelector(state => state.user)
  const { classes } = useStyles();

  console.log(infoUser)
  const animateProps = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    reset: false,
    delay: 100,
    config: { duration: 500 },
  });
  return (
    <animated.div style={{ ...animateProps, gridArea: props.gridArea, height: 'max-content' }}>
      <Card className={classes.cardContainer}>
        <Box className={classes.boxContainerHeader}>
          <Text component="h2">My Profile</Text>
          <span>icon</span>
        </Box>
        <Box className={classes.boxContainer}>
          <Box className={classes.boxInfoProfile}>
            <Box className={classes.containerAvatar}>
              {
                <Avatar
                  radius={55}
                  size={120}
                  src={(infoUser.avatar) ? infoUser.avatar.url : infoUser.mediaItems.nodes[0].mediaItemUrl}
                  alt="Image_Profile"
                />
              }
              <Text>sfasfgasdfg</Text>
            </Box>
          </Box>
          <Box className={classes.boxInfoProfile}>
            2
          </Box>
        </Box>
      </Card>
    </animated.div>
  );
};

export default ProfileCard;
