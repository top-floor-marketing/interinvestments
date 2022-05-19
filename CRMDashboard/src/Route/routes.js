import React, { Suspense } from "react";

import LoadingFull from "../Component/LoadingFull";

// components
const AuthComponent = React.lazy(() => import("../Component/Auth"));
const TestComponent = React.lazy(() => import("../Component/MantineTest"));

export const LAYOUT_NAMES = {
  EMPTY: "empty",
  DASHBOARD: "dashboard",
};

export const ROUTES_NAMES = {
  AUTH: "auth",
  HOME: "home",
  TESTMANTINE: "testmantine",
};

export const DEFAULT_ROUTE = ROUTES_NAMES.AUTH; //ROUTES_NAMES.HOME;

export const CRM_ROUTES = [
  {
    name: ROUTES_NAMES.TESTMANTINE,
    layout: LAYOUT_NAMES.EMPTY,
    component: () => (
      <Suspense
        fallback={
          <LoadingFull idLazy={ROUTES_NAMES.TESTMANTINE} isLoadingLazy />
        }
      >
        <TestComponent />
      </Suspense>
    ),
    useInSideBar: false,
    loginRequired: true,
  },
  {
    name: ROUTES_NAMES.AUTH,
    layout: LAYOUT_NAMES.EMPTY,
    component: () => (
      <Suspense
        fallback={<LoadingFull idLazy={ROUTES_NAMES.AUTH} isLoadingLazy />}
      >
        <AuthComponent />
      </Suspense>
    ),
    useInSideBar: false,
    loginRequired: true,
  },
  {
    name: ROUTES_NAMES.HOME,
    layout: LAYOUT_NAMES.EMPTY,
    component: () => (
      <Suspense
        fallback={<LoadingFull idLazy={ROUTES_NAMES.DASHBOARD} isLoadingLazy />}
      ></Suspense>
    ),
    useInSideBar: true,
    loginRequired: true,
  },
];
