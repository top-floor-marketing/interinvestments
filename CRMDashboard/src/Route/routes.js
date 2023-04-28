import React from "react";

import { LayoutGrid, Home2, Users, Briefcase } from "tabler-icons-react";

import AuthComponent from '../Container/AuthView';
import Pipeline from '../Container/PipelineView';
import Listings from '../Container/ListingsView';
import AgentsView from "../Container/AgentsView";
/* import ProfileComponent from '../Container/ProfileView';
import Listings from '../Container/ListingsView';
import LeadsView from '../Container/LeadsView';
import LeadsDetailView from "../Container/LeadDetailView";
import Pipeline from '../Container/PipelineView';
import AgentsView from "../Container/AgentsView"; */

import { USER_ROLES_CRM } from "../GlobalStore/utils";

export const LAYOUT_NAMES = {
  EMPTY: "empty",
  DASHBOARD: "dashboard",
};

export const ROUTES_NAMES = {
  AUTH: "auth",
  AGENTS: "agents",
  PIPELINE: "pipeline",
  LEADS: "leads",
  LEADS_DETAILS: "leads/details",
  PROFILE: "profile",
  LISTINGS: "properties",
};

export const DEFAULT_ROUTE = ''+ROUTES_NAMES.PIPELINE;

export const CRM_ROUTES = [
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
    roles: []
  },
  {
    name: ROUTES_NAMES.PIPELINE,
    label: "Pipeline",
    layout: LAYOUT_NAMES.DASHBOARD,
    component: () => (
      <Pipeline />
    ),
    useInNavbar: true,
    loginRequired: true,
    icon: () => <Home2 size={25} strokeWidth={2} color={"white"} />,
    roles: []
  },
  {
    name: ROUTES_NAMES.LISTINGS,
    label: "Properties",
    layout: LAYOUT_NAMES.DASHBOARD,
    component: () => (
      <Listings />
    ),
    useInNavbar: true,
    loginRequired: true,
    icon: () => <LayoutGrid size={25} strokeWidth={2} color={"white"} />,
    roles: []
  },
  {
    name: ROUTES_NAMES.AGENTS,
    label: "Agents",
    layout: LAYOUT_NAMES.DASHBOARD,
    component: () => (
      <AgentsView />
    ),
    useInNavbar: true,
    loginRequired: true,
    icon: () => <Briefcase size={25} strokeWidth={2} color={"white"} />,
    roles: [USER_ROLES_CRM.ADMIN]
  },
  /* {
    name: ROUTES_NAMES.LEADS_DETAILS,
    label: "Leads",
    layout: LAYOUT_NAMES.DASHBOARD,
    component: () => (
      <LeadsDetailView />
    ),
    useInNavbar: false,
    loginRequired: true,
    icon: null,
    roles: []
  },
  {
    name: ROUTES_NAMES.AGENTS,
    label: "Agents",
    layout: LAYOUT_NAMES.DASHBOARD,
    component: () => (
      <AgentsView />
    ),
    useInNavbar: true,
    loginRequired: true,
    icon: () => <Briefcase size={25} strokeWidth={2} color={"white"} />,
    roles: [USER_ROLES_CRM.ADMIN]
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
    roles: []
  },
  {
    name: ROUTES_NAMES.PIPELINE,
    label: "Pipeline",
    layout: LAYOUT_NAMES.DASHBOARD,
    component: () => (
      <Pipeline />
    ),
    useInNavbar: true,
    loginRequired: true,
    icon: () => <Home2 size={25} strokeWidth={2} color={"white"} />,
    roles: []
  },
  {
    name: ROUTES_NAMES.LEADS,
    label: "Leads",
    layout: LAYOUT_NAMES.DASHBOARD,
    component: () => (
      <LeadsView />
    ),
    useInNavbar: true,
    loginRequired: true,
    icon: () => <Users size={25} strokeWidth={2} color={"white"} />,
    roles: []
  },
  {
    name: ROUTES_NAMES.LISTINGS,
    label: "Properties",
    layout: LAYOUT_NAMES.DASHBOARD,
    component: () => (
      <Listings />
    ),
    useInNavbar: true,
    loginRequired: true,
    icon: () => <LayoutGrid size={25} strokeWidth={2} color={"white"} />,
    roles: []
  }, */
];
