import React from "react";

import { LayoutGrid, Home2 } from "tabler-icons-react";

import AuthComponent  from '../Component/Auth';
import ProfileComponent from '../Component/Profile';
//import DashboardComponent  from '../Component/Dashboard';
import PipelineComponent from '../Component/Pipeline';
import LeadsComponent  from '../Component/Leads';

export const LAYOUT_NAMES = {
  EMPTY: "empty",
  DASHBOARD: "dashboard",
};

export const ROUTES_NAMES = {
  AUTH: "auth",
  PIPELINE: "pipeline",
  LEADS: "leads",
  LEADS_DETAILS: "leads/details",
  PROFILE: "profile",
};

export const DEFAULT_ROUTE = ROUTES_NAMES.LEADS;

export const CRM_ROUTES = [
  {
    name: ROUTES_NAMES.PIPELINE,
    label: "Pipeline",
    layout: LAYOUT_NAMES.DASHBOARD,
    component: () => (
      <PipelineComponent />
    ),
    useInNavbar: false,
    loginRequired: true,
    icon: () => <Home2 size={25} strokeWidth={2} color={"white"} />,
    roles: ["administrator"]
  },
  {
    name: ROUTES_NAMES.LEADS,
    label: "Leads",
    layout: LAYOUT_NAMES.DASHBOARD,
    component: () => (
      <LeadsComponent />
    ),
    useInNavbar: true,
    loginRequired: true,
    icon: () => <LayoutGrid size={25} strokeWidth={2} color={"white"} />,
    roles: ["administrator"]
  },
  {
    name: ROUTES_NAMES.LEADS_DETAILS,
    label: "Leads",
    layout: LAYOUT_NAMES.DASHBOARD,
    component: () => (
      <LeadsComponent />
    ),
    useInNavbar: false,
    loginRequired: true,
    icon: () => <LayoutGrid size={25} strokeWidth={2} color={"white"} />,
    roles: ["administrator"]
  },
  {
    name: ROUTES_NAMES.AUTH,
    label: null,
    layout: LAYOUT_NAMES.EMPTY,
    component: () => (
      <AuthComponent />
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
      <ProfileComponent />
    ),
    useInNavbar: false,
    loginRequired: true,
    icon: null,
    roles: ["administrator"]
  },
];
