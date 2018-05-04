import Vue from 'vue';
import Router from 'vue-router';
import editGuard from './editGuard';

const HomePage = () => import('@/components/HomePage/HomePage');
const SANS1DFit = () => import('@/components/FitData/SANS1D');
const SANS1DBrowse = () => import('@/components/BrowseData/SANS1D');
const SANS1DStitch = () => import('@/components/StitchData/SANS');
const SANS2DGraph = () => import('@/components/Chart2D/SANS2D');

const TASFit = () => import('@/components/FitData/TAS');
const TASBrowse = () => import('@/components/BrowseData/TAS');
const TASCombine = () => import('@/components/CombineData/TAS');
const TASRunsTable = () => import('@/components/RunsTable/RunsTableTAS');

const POWDERBrowse = () => import('@/components/BrowseData/POWDER');
const POWDERFit = () => import('@/components/FitData/POWDER');
const POWDERCombine = () => import('@/components/CombineData/POWDER');
const POWDERRunsTable = () => import('@/components/RunsTable/RunsTablePOWDER');
const EditChart = () => import('@/components/EditChart/EditChart');
const Documentation = () => import('@/components/Documentation/Documentation');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/HomePage',
    },
    {
      path: '/',
      redirect: '/HomePage',
    },
    {
      path: '/EditChart',
      name: 'EditChart',
      component: EditChart,
      meta: {
        title: 'Edit Chart',
        sidebar: 'None',
        hideNavbar: true,
        breadcrumb: [
          { text: 'Home', href: '/HomePage', disabled: false },
          { text: 'Edit', href: '/', disabled: true },
        ],
      },
      beforeEnter: editGuard,
    },
    {
      path: '/HomePage',
      name: 'HomePage',
      component: HomePage,
      meta: {
        sidebar: 'None',
        hideNavbar: true,
        title: 'Home',
      },
    },
    // SANS Routes
    {
      path: '/SANS',
      redirect: '/HomePage',
    },
    {
      path: '/SANS/Fit',
      name: 'SANS1D-Fit',
      component: SANS1DFit,
      meta: {
        title: 'SANS1D Fit',
        group: 'SANS',
        subgroup: 'SANS1D',
        sidebar: 'SidebarSANS1DFit',
        hideNavbar: false,
        feature: 'Fit',
        breadcrumb: [
          { text: 'Home', href: '/HomePage', disabled: false },
          { text: 'SANS', href: '/', disabled: false },
          { text: 'Graph', href: '/', disabled: true },
        ],
      },
    },
    {
      path: '/SANS/Browse',
      name: 'SANS1D-Browse',
      component: SANS1DBrowse,
      meta: {
        title: 'SANS1D-Browse',
        group: 'SANS',
        subgroup: 'SANS1D',
        sidebar: 'SidebarSANS1DBrowse',
        hideNavbar: false,
        feature: 'Browse',
        breadcrumb: [
          { text: 'Home', href: '/HomePage', disabled: false },
          { text: 'SANS', href: '/SANS', disabled: false },
          { text: 'Browse', href: '/', disabled: true },
        ],
      },
    },
    {
      path: '/SANS/Stitch',
      name: 'SANS1D-Stitch',
      component: SANS1DStitch,
      meta: {
        title: 'SANS1D Stitch',
        group: 'SANS',
        subgroup: 'SANS1D',
        sidebar: 'SidebarSANS1DStitch',
        hideNavbar: false,
        feature: 'Stitch',
        breadcrumb: [
          { text: 'Home', href: '/HomePage', disabled: false },
          { text: 'SANS', href: '/SANS', disabled: false },
          { text: 'Stitch', href: '/', disabled: true },
        ],
      },
    },
    {
      path: '/SANS/SANS2D',
      name: 'SANS2D',
      component: SANS2DGraph,
      meta: {
        title: 'SANS2D',
        group: 'SANS',
        subgroup: 'SANS2D',
        sidebar: 'SidebarSANS2D',
        hideNavbar: false,
        feature: '2D',
        breadcrumb: [
          { text: 'Home', href: '/HomePage', disabled: false },
          { text: 'SANS', href: '/SANS', disabled: false },
          { text: '2D', href: '/', disabled: true },
        ],
      },
    },
    // TAS ROUTES
    {
      path: '/TAS',
      redirect: '/HomePage',
    },
    {
      path: '/TAS/Fit',
      name: 'TAS-Fit',
      component: TASFit,
      meta: {
        title: 'TAS-Fit',
        group: 'TAS',
        sidebar: 'SidebarTASFit',
        hideNavbar: false,
        feature: 'Fit',
        breadcrumb: [
          { text: 'Home', href: '/HomePage', disabled: false },
          { text: 'TAS', href: '/TAS', disabled: false },
          { text: 'Graph', href: '/', disabled: true },
        ],
      },
    },
    {
      path: '/TAS/Browse',
      name: 'TAS-Browse',
      component: TASBrowse,
      meta: {
        title: 'TAS-Browse',
        group: 'TAS',
        sidebar: 'SidebarTASBrowse',
        hideNavbar: false,
        feature: 'Browse',
        breadcrumb: [
          { text: 'Home', href: '/HomePage', disabled: false },
          { text: 'TAS', href: '/TAS', disabled: false },
          { text: 'Browse', href: '/', disabled: true },
        ],
      },
    },
    {
      path: '/TAS/Combine',
      name: 'TAS-Combine',
      component: TASCombine,
      meta: {
        title: 'TAS-Combine',
        group: 'TAS',
        sidebar: 'SidebarTASCombine',
        hideNavbar: false,
        feature: 'Combine',
        breadcrumb: [
          { text: 'Home', href: '/HomePage', disabled: false },
          { text: 'TAS', href: '/TAS', disabled: false },
          { text: 'Combine', href: '/', disabled: true },
        ],
      },
    },
    {
      path: '/TAS/RunsTable',
      name: 'TAS-Runs-Table',
      component: TASRunsTable,
      meta: {
        title: 'TAS-Runs-Title',
        group: 'TAS',
        sidebar: 'None',
        hideNavbar: false,
        breadcrumb: [
          { text: 'Home', href: '/HomePage', disabled: false },
          { text: 'TAS', href: '/TAS', disabled: false },
          { text: 'Runs', href: '/', disabled: true },
        ],
      },
    },
    // POWDER ROUTES
    {
      path: '/POWDER',
      redirect: '/HomePage',
    },
    {
      path: '/POWDER/Fit',
      name: 'POWDER-Fit',
      component: POWDERFit,
      meta: {
        title: 'POWDER-Fit',
        group: 'POWDER',
        sidebar: 'SidebarPOWDERFit',
        hideNavbar: false,
        feature: 'Fit',
        breadcrumb: [
          { text: 'Home', href: '/HomePage', disabled: false },
          { text: 'POWDER', href: '/POWDER', disabled: false },
          { text: 'Graph', href: '/', disabled: true },
        ],
      },
    },
    {
      path: '/POWDER/Browse',
      name: 'POWDER-Browse',
      component: POWDERBrowse,
      meta: {
        title: 'POWDER-Browse',
        group: 'POWDER',
        sidebar: 'SidebarPOWDERBrowse',
        hideNavbar: false,
        feature: 'Browse',
        breadcrumb: [
          { text: 'Home', href: '/HomePage', disabled: false },
          { text: 'POWDER', href: '/POWDER', disabled: false },
          { text: 'Browse', href: '/', disabled: true },
        ],
      },
    },
    {
      path: '/POWDER/Combine',
      name: 'POWDER-Combine',
      component: POWDERCombine,
      meta: {
        title: 'POWDER-Combine',
        group: 'POWDER',
        sidebar: 'SidebarPOWDERCombine',
        hideNavbar: false,
        feature: 'Combine',
        breadcrumb: [
          { text: 'Home', href: '/HomePage', disabled: false },
          { text: 'POWDER', href: '/POWDER', disabled: false },
          { text: 'Combine', href: '/', disabled: true },
        ],
      },
    },
    {
      path: '/POWDER/RunsTable',
      name: 'POWDER-Runs-Table',
      component: POWDERRunsTable,
      meta: {
        title: 'POWDER-Runs-Title',
        group: 'POWDER',
        sidebar: 'None',
        hideNavbar: false,
        breadcrumb: [
          { text: 'Home', href: '/HomePage', disabled: false },
          { text: 'POWDER', href: '/POWDER', disabled: false },
          { text: 'Runs', href: '/', disabled: true },
        ],
      },
    },
    // Documentation Route
    {
      path: '/Documentation',
      name: 'Documentation',
      component: Documentation,
      meta: {
        title: 'User Documentation',
        group: 'Documentation',
        sidebar: 'SidebarDocumentation',
        hideNavbar: false,
        breadcrumb: [
          { text: 'Home', href: '/HomePage', disabled: false },
          { text: 'Documentation', href: '/Documentation', disabled: false },
        ],
      },
    },
  ],
});
