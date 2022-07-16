import { Box, createStyles, Text, Avatar, ThemeIcon } from "@mantine/core";
import DOMPurify from 'dompurify'
import PropTypes from 'prop-types';

import { Mail, Phone, BrandLinkedin, BrandFacebook, BrandInstagram, BrandTwitter } from 'tabler-icons-react';
import { CustomIconTooltip } from "../../ActionButtons";

import get from 'lodash/get';
import concat from 'lodash/concat';

const useStyles = createStyles((theme, _params, getRef) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    gap: theme.other.spacing.p5,
    [`${theme.fn.smallerThan("md")}`]: { 
        flexDirection: "column",
    },
    'span': {
        fontSize: "12px",
        color: theme.colors.gray[9],
        marginTop: "auto",
        marginBottom: "auto",
        lineHeight: "24px",
        wordBreak: "break-word"
    },
    'strong, p': {
        fontSize: "14px",
        color: theme.colors.gray[9],
        lineHeight: "24px",
        wordBreak: "break-word"
    }
  },
  infoAbout: {
    display: "flex",
    flexDirection: "column",
    width: "60%",
    gap: theme.other.spacing.p5,
    [`${theme.fn.smallerThan("md")}`]: { 
        width: "100%",
    }
  },
  infoContact: {
    display: "flex",
    flexDirection: "column",
    width: "40%",
    gap: theme.other.spacing.p5,
    [`${theme.fn.smallerThan("md")}`]: { 
        width: "100%",
    },
    'h4': {
        fontSize: "16px",
        fontWeight: 500,
        margin: "0px !important",
    },
    '.mantine-ThemeIcon-root': {    
        backgroundColor: 'transparent !important',
        color: theme.colors.secondary[6]
    }
  },
  infoItem: {
    display: "flex",
    flexDirection: "row",
    gap: theme.other.spacing.p5,
    'span': {
        fontSize: "12px",
        margin: "0px !important",
    }
  },
  infoSocialMedia: {
    display: "flex",
    flexDirection: "row",
    gap: theme.other.spacing.p5,
  },
  avatarContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    padding: 0,
    gap: theme.other.spacing.p5,
    [`${theme.fn.smallerThan("sm")}`]: { 
        flexDirection: "column",
    }
  },
  avatarItem: {
    display: "flex",
    flexDirection: "column",
    width: "auto",
    height: "auto",
    [`${theme.fn.smallerThan("sm")}`]: { 
        width: "100%",
        alignItems: "center"
    }
  },
  agentName: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    height: "auto",
    [`${theme.fn.smallerThan("sm")}`]: { 
        width: "100%",
        alignItems: "center"
    },
    'h4': {
        fontSize: "16px",
        fontWeight: 600,
        margin: "0px !important",
    },
    'span': {
        fontSize: "12px",
        margin: "0px !important",
    }
  },
  aboutMeContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: theme.other.spacing.p5,
    'h4': {
        fontSize: "16px",
        fontWeight: 500,
        margin: "0px !important",
    },
    'span, strong, p': {
        textTransform: "capitalize",
        margin: "0px !important",
    }
  }
}));

const InfoAgent = ({ dataAgent }) => {
  const { classes } = useStyles();

  /*
    avatar: "https://interinvestments.bytfm.com/wp-content/plugins/ultimate-member/assets/img/default_avatar.jpg"
content: "<p>test test</p>\n"
email: "juangug96@gmail.com"
facebook: "https://www.facebook.com/"
firstName: "Gustavo"
id: "1"
instagram: "https://www.instagram.com/"
lastName: "Gomez"
linkedin: "https://www.linkedin.com/"
listing: []
phone: "123456789"
position: "test"
roles: "Administrator"
twitter: "https://twitter.com/"
  */

  const sanitizedContentData = () => ({
    __html: DOMPurify.sanitize(get(dataAgent, ["content"], ""))
  })

  return (
    <Box className={classes.container}>
        <Box className={classes.infoAbout}>
            <Box className={classes.avatarContainer}>
                <Box className={classes.avatarItem}>
                    <Avatar 
                    radius="_40px" 
                    size="xl" 
                    src="https://pop.inquirer.net/files/2021/05/gigachad.jpg"
                    //src={get(dataAgent, ["avatar"], "")}
                     />
                </Box>
                <Box className={classes.agentName}>
                    <Text transform="capitalize" component="h4">{concat(get(dataAgent, ["firstName"], ""), " ", get(dataAgent, ["lastName"], ""))}</Text>
                    <Text transform="capitalize" component="span">{get(dataAgent, ["position"], "")}</Text>
                </Box>
            </Box>
            <Box className={classes.aboutMeContainer}>
                <Text transform="capitalize" component="h4">About me</Text>
                <Box dangerouslySetInnerHTML={sanitizedContentData()} />
            </Box>
        </Box>
        <Box className={classes.infoContact}>
            <Text transform="capitalize" component="h4">Contact info</Text>
            <Box className={classes.infoItem}>
                <CustomIconTooltip size={24} color="secondary" labelTooltip="Copy email">
                    <Mail />
                </CustomIconTooltip>
                <Text transform="capitalize" component="span">{get(dataAgent, ["email"], "")}</Text>
            </Box>
            <Box className={classes.infoItem}>
                <CustomIconTooltip size={24} color="secondary" labelTooltip="Copy phone">
                    <Phone />
                </CustomIconTooltip>
                <Text transform="capitalize" component="span">{get(dataAgent, ["phone"], "")}</Text>
            </Box>
            <Box className={classes.infoSocialMedia}>
                <CustomIconTooltip size={24} color="secondary" labelTooltip={get(dataAgent, ["facebook"], "")}>
                    <BrandFacebook />
                </CustomIconTooltip>
                <CustomIconTooltip size={24} color="secondary" labelTooltip={get(dataAgent, ["twitter"], "")}>
                    <BrandTwitter />
                </CustomIconTooltip>
                <CustomIconTooltip size={24} color="secondary" labelTooltip={get(dataAgent, ["instagram"], "")}>
                    <BrandInstagram />
                </CustomIconTooltip>
                <CustomIconTooltip size={24} color="secondary" labelTooltip={get(dataAgent, ["linkedin"], "")}>
                    <BrandLinkedin />
                </CustomIconTooltip>
            </Box>
        </Box>
    </Box>
  );
};

// Specifies the default values for props:
InfoAgent.defaultProps = {
    dataAgent: null,
};

InfoAgent.propTypes = {
    dataAgent: PropTypes.object,
};

export default InfoAgent;
