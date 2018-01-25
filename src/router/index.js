import Vue from 'vue';
import Router from 'vue-router';

import ORNL404 from '@/components/ORNL404';
import SANS1DGraph from '@/components/GraphData/SANS1D';
import Stitch from '@/components/GraphData/Stitch';
import SANS2DGraph from '@/components/GraphData/SANS2D';
import TASGraph from '@/components/GraphData/TAS';

import SANS1DBrowse from '@/components/BrowseData/SANS1D';
import StitchBrowse from '@/components/BrowseData/Stitch';
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
      redirect: '/SANS1D',
    },
    {
      path: '/SANS1D-Browse',
      name: 'SANS1D-Browse',
      component: SANS1DBrowse,
      meta: {
        title: 'SANS1D-Browse',
        group: 'SANS',
        sidebar: 'SidebarSANS1DBrowse',
      },
    },
    {
      path: '/SANS1D',
      name: 'SANS1D',
      component: SANS1DGraph,
      meta: {
        title: 'SANS1D',
        group: 'SANS',
        sidebar: 'SidebarSANS1D',
      },
    },
    {
      path: '/Stitch',
      name: 'Stitch',
      component: Stitch,
      meta: {
        title: 'Stitch',
        group: 'SANS',
        sidebar: 'SidebarStitch',
      },
    },
    {
      path: '/Stitch-Browse',
      name: 'Stitch-Browse',
      component: StitchBrowse,
      meta: {
        title: 'Stitch',
        group: 'SANS',
        sidebar: 'SidebarStitchBrowse',
      },
    },
    {
      path: '/SANS2D',
      name: 'SANS2D',
      component: SANS2DGraph,
      meta: {
        title: 'SANS2D',
        group: 'SANS',
        sidebar: 'SidebarSANS2D',
      },
    },
    {
      path: '/TAS-Browse',
      name: 'TAS-Browse',
      component: TASBrowse,
      meta: {
        title: 'TAS-Browse',
        group: 'TAS',
        sidebar: 'SidebarTASBrowse',
      },
    },
    {
      path: '/TAS',
      name: 'TAS',
      component: TASGraph,
      meta: {
        title: 'TAS',
        group: 'TAS',
        sidebar: 'SidebarTAS',
      },
    },
  ],
});
