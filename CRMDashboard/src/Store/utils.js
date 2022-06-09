import { CRM_ROUTES } from "../Route/routes";

import filter from "lodash/filter";
import get from "lodash/get";

export const getRouteActive = (routeName) => {
  return get(
    filter(CRM_ROUTES, (o) => {
      return o.name === routeName;
    })[0],
    ["name"],
    null
  );
};
