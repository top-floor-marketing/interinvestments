
import {useState, useCallback} from "react";
// global store 
import useClientGlobalStore from "../../../GlobalStore/useClientGlobalStore";

import { useQueryHelper } from "../../../GraphqlClient/useRequest";
import { GET_USER_BY_ID } from "../../../GraphqlClient/user.gql";
import { GET_AGENT_PROFILE_INFO } from "../../../GraphqlClient/agentProfile.gql";
import { GET_STATUS_USER_LEADS } from "../../../GraphqlClient/userLeads.gql";

import { LOCAL_STORAGE } from "../../../Utils/globalConstants";

import { PIPELINE_STATUS } from '../../../GlobalStore/utils';

import { getAgentTypeByRole } from "../../../GlobalStore/useActionsUser";

import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import findLast from 'lodash/findLast';
import toLower from 'lodash/toLower';

const useUserIsAuth = () => {

  const { state: { global: { isLoadingFull } }, actions: { setStatusUserLead, setLoadingFull, setInfoUser, setRoute, setLogout } } = useClientGlobalStore();

  const [finishSetStatus, setFinishSetStatus] = useState(false);

  const userIdLocalStorage = localStorage.getItem(LOCAL_STORAGE.USER);
  const routeInLocalStorage = localStorage.getItem(LOCAL_STORAGE.ROUTE);

  const getUserResponse = (data) => {
    const hasRoles = !isEmpty(get(data, ["user", "roles"]));
    const hasUserName = get(data, ["user", "username"]);
    const hasId = get(data, ["user", "id"]);
    return !!(hasUserName && hasId && hasRoles);
  };


  const getColorItem = useCallback((label) => {
    switch (toLower(label)) {
      case PIPELINE_STATUS.NOT_CONTACTED:
        return "error";
      case PIPELINE_STATUS.CONTACTED:
        return "primary";
      case PIPELINE_STATUS.SHOWING:
        return "secondary";
      case PIPELINE_STATUS.CONTRACT:
        return "success";
      case PIPELINE_STATUS.ASK_REFERRALS:
        return "info";
      default:
        return "";
    }
  }, []);

  // get status user leads and set in global store
  useQueryHelper({
    name: ["get-status-user-leads"],
    gql: GET_STATUS_USER_LEADS,
    config: {
      cacheTime: 300000,
      onSuccess: (response) => {
        const listStatus = get(response, ["statuses", "nodes"], []);
        const dataForSelect = listStatus.map((val) => ({ value: val.databaseId, label: val.name }));
        const arrayState = [PIPELINE_STATUS.NOT_CONTACTED, PIPELINE_STATUS.CONTACTED, PIPELINE_STATUS.SHOWING, PIPELINE_STATUS.CONTRACT, PIPELINE_STATUS.ASK_REFERRALS];
        const dataOrder = arrayState.map((val) => {
          const findByLabel = findLast(dataForSelect, (i) => (toLower(i.label) === toLower(val)))
          return {
            ...findByLabel,
            color: getColorItem(findByLabel?.label)
          }
        })
        setStatusUserLead(dataOrder);
        setTimeout(() => {
          setFinishSetStatus(true);
        }, 500);
      },
    },
  });

  const { data: dataUser } = useQueryHelper({
    name: ["get-user-crm-verify", userIdLocalStorage],
    gql: GET_USER_BY_ID,
    config: {
      cacheTime: 300000,
      onSuccess: (response) => {
        const isLoginUser = getUserResponse(response);
        if (!isLoginUser)
          setLogout();
      },
      onError: (e) => {
        setLogout();
      },
    },
    variables: {
      id: userIdLocalStorage,
    },
  });

  const agentId = get(dataUser, ["user", "databaseId"], null);
  const agentType = getAgentTypeByRole(get(dataUser, ["user"], {}));

  useQueryHelper({
    name: ["get-agent-verify-crm", agentId, agentType],
    gql: GET_AGENT_PROFILE_INFO,
    config: {
      enabled: getUserResponse(dataUser),
      onSuccess: (response) => {
        const infoAgent = get(response, ["dataAgent", "0"], null);

        if (!infoAgent)
          setLogout();

        else {
          setRoute(routeInLocalStorage);
          setInfoUser(infoAgent);

          setTimeout(() => {
            setLoadingFull(false);
          }, 700)
        }

      },
      onError: (e) => {
        setLogout();
      },
    },
    variables: {
      agentId,
      agentType
    },
  });

  return {
    loadingVerify: isLoadingFull || !finishSetStatus,
  };

};

export default useUserIsAuth;
