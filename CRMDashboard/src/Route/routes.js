import React, { Suspense } from "react";

import LoadingFull from "../Component/LoadingFull";

import { List, LayoutGrid, Home2 } from "tabler-icons-react";

// components
const AuthComponent = React.lazy(() => import("../Component/Auth"));
const TestComponent = React.lazy(() => import("../Component/MantineTest"));
const ProfileComponent = React.lazy(() => import("../Component/Profile"));
const DashboardComponent = React.lazy(() => import("../Component/Dashboard"));
const PipelineComponent = React.lazy(() => import("../Component/Pipeline"));

export const LAYOUT_NAMES = {
  EMPTY: "empty",
  DASHBOARD: "dashboard",
};

export const ROUTES_NAMES = {
  AUTH: "auth",
  HOME: "home",
  LEAD: "lead-list",
  PIPELINE: "pipeline",
  PROFILE: "profile",
};

export const DEFAULT_ROUTE = ROUTES_NAMES.PIPELINE;

export const CRM_ROUTES = [
  {
    name: ROUTES_NAMES.HOME,
    label: "Home",
    layout: LAYOUT_NAMES.DASHBOARD,
    component: () => (
      <Suspense
        fallback={<LoadingFull idLazy={ROUTES_NAMES.DASHBOARD} isLoadingLazy />}
      >
        <DashboardComponent />
      </Suspense>
    ),
    useInNavbar: false,
    loginRequired: true,
    icon: () => <Home2 size={25} strokeWidth={2} color={"white"} />,
    roles: ["administrator"]
  },
  {
    name: ROUTES_NAMES.PIPELINE,
    label: "Pipeline",
    layout: LAYOUT_NAMES.DASHBOARD,
    component: () => (
      <Suspense
        fallback={<LoadingFull idLazy={ROUTES_NAMES.PIPELINE} isLoadingLazy />}
      >
        <PipelineComponent />
      </Suspense>
    ),
    useInNavbar: true,
    loginRequired: true,
    icon: () => <LayoutGrid size={25} strokeWidth={2} color={"white"} />,
    roles: ["administrator"]
  },
  {
    name: ROUTES_NAMES.AUTH,
    label: null,
    layout: LAYOUT_NAMES.EMPTY,
    component: () => (
      <Suspense
        fallback={<LoadingFull idLazy={ROUTES_NAMES.AUTH} isLoadingLazy />}
      >
        <AuthComponent />
      </Suspense>
    ),
    useInNavbar: false,
    loginRequired: false,
    icon: null,
    roles: ["administrator"]
  },
  {
    name: ROUTES_NAMES.PROFILE,
    label: null,
    layout: LAYOUT_NAMES.DASHBOARD,
    component: () => (
      <Suspense
        fallback={<LoadingFull idLazy={ROUTES_NAMES.PROFILE} isLoadingLazy />}
      >
        <ProfileComponent />
      </Suspense>
    ),
    useInNavbar: false,
    loginRequired: true,
    icon: null,
    roles: ["administrator"]
  },
];
