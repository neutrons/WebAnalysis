import Vue from 'vue';
import Router from 'vue-router';

import ORNL404 from '@/components/ORNL404';
import SANS1D from '@/components/MainPages/MainSANS1D';
import SANS2D from '@/components/MainPages/SANS2D/Main';
import Stitch from '@/components/MainPages/MainStitch';
import TAS from '@/components/MainPages/MainTAS';

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
      path: '/SANS1D',
      name: 'SANS1D',
      component: SANS1D,
      meta: {
        title: 'SANS1D',
        group: 'SANS',
      },
    },
    {
      path: '/SANS2D',
      name: 'SANS2D',
      component: SANS2D,
      meta: {
        title: 'SANS2D',
        group: 'SANS',
      },
    },
    {
      path: '/Stitch',
      name: 'Stitch',
      component: Stitch,
      meta: {
        title: 'Stitch',
        group: 'SANS',
      },
    },
    {
      path: '/TAS',
      name: 'TAS',
      component: TAS,
      meta: {
        title: 'TAS',
        group: 'TAS',
      },
    },
  ],
});
