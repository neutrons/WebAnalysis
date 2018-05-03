<template>
<v-layout row wrap class='home-container'>
  <!-- generate homepage menus -->
  <v-homepage-menu v-for='menu in menus' :key='menu.header' :header='menu.header' :links='menu.links' />
</v-layout>
</template>

<script>
import POWDERLinks from './POWDERLinks';
import SANSLinks from './SANSLinks';
import TASLinks from './TASLinks';
import DocumentationLinks from './DocumentationLinks';

export default {
  name: 'HomePage',
  components: {
    'v-homepage-menu': () => import('./HomePageMenu'),
  },
  data() {
    return {
      menus: [
        {
          header: 'DOCUMENTATION',
          links: DocumentationLinks,
        },
        {
          header: 'SANS',
          links: SANSLinks,
        },
        {
          header: 'TAS',
          links: TASLinks,
        },
        {
          header: 'POWDER',
          links: POWDERLinks,
        },
      ],
    };
  },
};
</script>

<style lang='scss'>
.home-container {
  position: absolute !important;
  top: 15px;
  left: 25px;
}

.card .avatar {
  box-shadow:inset 0 0 0 99999px rgba(255, 255, 255, 0.2);
}

.card:hover .avatar {
  box-shadow:inset 0 0 0 99999px rgba(255, 255, 255, 0);
}

.icon-size {
  width: 100% !important;
  height: 65px !important;
}
</style>