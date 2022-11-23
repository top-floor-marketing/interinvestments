import { Box, createStyles, Breadcrumbs, Text } from "@mantine/core";
import SpringDiv from "../../Component/SpringDiv";
import { ROUTES_NAMES } from "../../Route/routes";
import { LOCAL_STORAGE } from "../../Utils/globalConstants";

import useClientGlobalStore from "../../GlobalStore/useClientGlobalStore";

import useGetPersonalInfoLead from "./hooks/useGetPersonalInfoLead";
import useGetInterested from './hooks/useGetInterested';

import PersonalInfoLead from "./personalInfoLead";
import CommentsTimeline from './commentsTimeline';
import LeadInterested from './leadInterested';

import get from 'lodash/get';

const useStyles = createStyles((theme, _params) => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: theme.other.spacing.p4,
    height: "100%"
  },
  rowInfoAndTimeLine: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: theme.other.spacing.p4,
    height: "450px",
    [`${theme.fn.smallerThan(700)}`]: {
      flexDirection: "column",
    },
  },
  textBreadCrum: {
    fontSize: "16px !important",
    fontWeight: "600 !important"
  },
  currentBreadCrum: {
    color: theme.colors.primary[6],
    '&:hover': {
      cursor: 'pointer !important',
      color: theme.colors.primary[8],
    }
  }
}));

const DetailLeadByAgent = ({ idAgent, idLead, isAdmin }) => {
  const { cx, classes } = useStyles();

  const { actions: { setRoute } } = useClientGlobalStore();

  const { dataLead, isLoading, isSkeleton, allComments, refetch } =
    useGetPersonalInfoLead({ idAgent, idLead });

    const { isSkeleton: skeletonInterested, dataInterested } = useGetInterested({ idAgent, idLead });  

  const routeBreadCrumbs = () => {
    localStorage.setItem(LOCAL_STORAGE.LEAD_DETAIL_ID, null);
    setRoute(ROUTES_NAMES.LEADS);
  }
  const items = [
    { title: 'Leads', route: ROUTES_NAMES.LEADS },
    { title: 'Lead info', route: null },
  ].map((item, index) => (
    <Text
      variant={item.title === 'Leads' ? 'link' : 'text'}
      key={index}
      onClick={() => routeBreadCrumbs()}
      className={cx(classes.textBreadCrum, { [classes.currentBreadCrum]: item.title === 'Leads' })}>
      {item.title}
    </Text>
  ));

  return (
    <SpringDiv delay={100} duration={200} fullHeight>
      <Box className={classes.container}>
        <Breadcrumbs>{items}</Breadcrumbs>
        <SpringDiv delay={300} duration={300}>
          <Box className={classes.rowInfoAndTimeLine}>
            <PersonalInfoLead dataLead={dataLead} serviceList={get(dataInterested, ["serviceList"], [])}  isSkeleton={isSkeleton} />
            <CommentsTimeline
              dataLead={dataLead}
              allComments={allComments}
              isLoading={isLoading}
              isSkeleton={isSkeleton}
              refetch={refetch}
              idAgent={idAgent}
              idLead={idLead}
              isAdmin={isAdmin}
            />
          </Box>
        </SpringDiv>
        <SpringDiv delay={400} duration={300} fullHeight>
          <LeadInterested idAgent={idAgent} dataInterested={dataInterested} isSkeleton={skeletonInterested} />
        </SpringDiv>
      </Box>
    </SpringDiv>
  );
};

export default DetailLeadByAgent;
