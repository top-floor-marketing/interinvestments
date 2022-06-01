import React, { Suspense } from "react";

import LoadingFull from "../Component/LoadingFull";

import { Dashboard, List, LayoutGrid } from "tabler-icons-react";

// components
const AuthComponent = React.lazy(() => import("../Component/Auth"));
const TestComponent = React.lazy(() => import("../Component/MantineTest"));
const ProfileComponent = React.lazy(() => import("../Component/Profile"));
const DashboardComponent = React.lazy(() => import("../Component/Dashboard"));

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

export const DEFAULT_ROUTE = ROUTES_NAMES.HOME;

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
    useInNavbar: true,
    loginRequired: true,
    icon: () => <Dashboard size={25} strokeWidth={2} color={"white"} />,
  },
  {
    name: ROUTES_NAMES.LEAD,
    label: "Lead list",
    layout: LAYOUT_NAMES.DASHBOARD,
    component: () => (
      <Suspense
        fallback={<LoadingFull idLazy={ROUTES_NAMES.DASHBOARD} isLoadingLazy />}
      >
        <TestComponent />
      </Suspense>
    ),
    useInNavbar: true,
    loginRequired: true,
    icon: () => <List size={25} strokeWidth={2} color={"white"} />,
  },
  {
    name: ROUTES_NAMES.PIPELINE,
    label: "Pipeline",
    layout: LAYOUT_NAMES.DASHBOARD,
    component: () => (
      <Suspense
        fallback={<LoadingFull idLazy={ROUTES_NAMES.DASHBOARD} isLoadingLazy />}
      >
        <TestComponent />
      </Suspense>
    ),
    useInNavbar: true,
    loginRequired: true,
    icon: () => <LayoutGrid size={25} strokeWidth={2} color={"white"} />,
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
  },
];
