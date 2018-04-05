<template>
  <v-toolbar
    fixed
    app
    dense
    class='elevation-1'
    :clipped-left='true' :clipped-right='true'
    color='secondary'
    :dark='!$vuetify.dark'>

    <v-toolbar-side-icon @click.stop='$emit("toggle-sidebar")' class='ml-3 mr-3'>
      <v-icon>fa-sliders</v-icon>
    </v-toolbar-side-icon>

    <!-- bread crumb component -->
    <v-breadcrumbs>
      <v-icon slot='divider'>chevron_right</v-icon>
      <v-breadcrumbs-item 
        v-for='(item, key) in $route.meta.breadcrumb' :key='key'
        :to='item.href'
        :disabled='item.disabled'
      >
        {{ item.text }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-fetch-data></v-fetch-data>
      <v-upload-data></v-upload-data>
    </v-toolbar-items>

    <!-- SANS Nav Menu -->
    <v-sans-nav-menu v-if='$route.meta.group === "SANS"' />

    <!-- TAS Nav Menu -->
    <v-tas-nav-menu v-if='$route.meta.group === "TAS"' />

    <!-- POWDER Nav Menu -->
    <v-powder-nav-menu v-if='$route.meta.group === "POWDER"' />

  </v-toolbar>
</template>

<script>
import FetchData from '../FetchData/FetchData';
import UploadData from '../UploadData/UploadData';

export default {
  name: 'Navbar',
  components: {
    'v-fetch-data': FetchData,
    'v-upload-data': UploadData,
    'v-tas-nav-menu': () => import('./TASNavMenu'),
    'v-sans-nav-menu': () => import('./SANSNavMenu'),
    'v-powder-nav-menu': () => import('./POWDERNavMenu'),
  },

};
</script>

<style lang='scss'>
.my-active-green {
  color: white !important;
  background: #00a547 !important;
}

.my-active-white {
  color: white !important;
  background: grey !important;
}

.my-active-blue {
  color: white !important;
  background: #00b0ff !important;
}
</style>