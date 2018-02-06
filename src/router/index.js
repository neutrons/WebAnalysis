import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '@/components/HomePage';
import ORNL404 from '@/components/ORNL404';
import SANS1DFit from '@/components/FitData/SANS1D';
import SANS1DBrowse from '@/components/BrowseData/SANS1D';
import SANS1DStitch from '@/components/StitchData/SANS';
import SANS2DGraph from '@/components/Chart2D/SANS2D';
import TASFit from '@/components/FitData/TAS';
import TASBrowse from '@/components/BrowseData/TAS';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '*',
      name: 'ORNL404',
      component: ORNL404,
      meta: { title: '404' },
    },
    {
      path: '/',
      redirect: '/HomePage',
    },
    {
      path: '/HomePage',
      name: 'HomePage',
      component: HomePage,
      meta: {
        title: 'Home',
      },
    },
    {
      path: '/Documentation',
      redirect: { path: '/HomePage', query: { filter: 'Documentation' } },
    },
    {
      path: '/SANS',
      redirect: { path: '/HomePage', query: { filter: 'SANS' } },
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
        feature: 'Fit',
        breadcrumb: [
          { text: 'Home', href: '/HomePage', disabled: false },
          { text: 'SANS', href: '/', disabled: false },
          { text: 'Fit', href: '/', disabled: true },
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
        feature: '2D',
        breadcrumb: [
          { text: 'Home', href: '/HomePage', disabled: false },
          { text: 'SANS', href: '/SANS', disabled: false },
          { text: 'Plot 2D', href: '/', disabled: true },
        ],
      },
    },
    {
      path: '/TAS',
      redirect: { path: '/HomePage', query: { filter: 'TAS' } },
    },
    {
      path: '/TAS/Fit',
      name: 'TAS-Fit',
      component: TASFit,
      meta: {
        title: 'TAS-Fit',
        group: 'TAS',
        sidebar: 'SidebarTASFit',
        feature: 'Fit',
        breadcrumb: [
          { text: 'Home', href: '/HomePage', disabled: false },
          { text: 'TAS', href: '/TAS', disabled: false },
          { text: 'Fit', href: '/', disabled: true },
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
        feature: 'Browse',
        breadcrumb: [
          { text: 'Home', href: '/HomePage', disabled: false },
          { text: 'TAS', href: '/TAS', disabled: false },
          { text: 'Browse', href: '/', disabled: true },
        ],
      },
    },
  ],
});
