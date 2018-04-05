<template>
<v-layout row wrap class='home-container'>

  <!-- Documentation Menu -->
  <v-documentation-home-page-menu />

  <!-- SANS Menu -->
  <v-sans-home-page-menu />

  <!-- TAS Menu -->
  <v-tas-home-page-menu />

  <!-- POWDER Menu -->
  <v-powder-home-page-menu />

</v-layout>
</template>

<script>
export default {
  name: 'HomePage',
  components: {
    'v-documentation-home-page-menu': () => import('./DocumentationHomePageMenu'),
    'v-sans-home-page-menu': () => import('./SANSHomePageMenu'),
    'v-tas-home-page-menu': () => import('./TASHomePageMenu'),
    'v-powder-home-page-menu': () => import('./POWDERHomePageMenu'),
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