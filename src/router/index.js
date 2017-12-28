import Vue from 'vue';
import Router from 'vue-router';

import ORNL404 from '@/components/ORNL404';
import SANS1D from '@/components/SANS1D/Main';
import SANS2D from '@/components/SANS2D/Main';
import Stitch from '@/components/Stitch/Main';
import TAS from '@/components/TAS/Main';

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
