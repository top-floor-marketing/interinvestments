import { CRM_ROUTES } from "../Route/routes";

import filter from "lodash/filter";
import get from "lodash/get";

export const USER_ROLES_CRM = {
  ADMIN: 'MASTER',
  AGENT: 'AGENT',
}

export const PIPELINE_STATUS = {
  NOT_CONTACTED: "not contacted",
  CONTACTED: "contacted",
  SHOWING: "showing",
  CONTRACT: "contract",
  ASK_REFERRALS: "ask referrals"
}

export const getRouteActive = (routeName) => {
  return get(
    filter(CRM_ROUTES, (o) => {
      return o.name === routeName;
    })[0],
    ["name"],
    null
  );
};

export const getIsAdminUser = () => {
  return true;
}