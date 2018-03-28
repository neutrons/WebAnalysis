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
    <v-toolbar-items class='hidden-sm-and-down' v-if='$route.meta.group === "SANS"'>
      <v-btn flat to='/SANS/Browse' exact :active-class='activeClass'>Browse</v-btn>
      <v-btn flat to='/SANS/Fit' exact :active-class='activeClass'>Graph</v-btn>
      <v-btn flat to='/SANS/Stitch' exact :active-class='activeClass'>Stitch</v-btn>
      <v-btn flat to='/SANS/SANS2D' exact :active-class='activeClass'>2D</v-btn>
    </v-toolbar-items>

    <!-- SANS Drop Down Menu on Small Screens -->
    <v-menu offset-y bottom class='hidden-md-and-up' v-if='$route.meta.group === "SANS"'>
      <v-btn flat icon slot='activator'>
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-list dense>
        <v-list-tile to='/SANS/Browse' exact :active-class='activeClass'>
          <v-list-tile-title>Browse</v-list-tile-title>
        </v-list-tile>

        <v-list-tile to='/SANS/Fit' exact :active-class='activeClass'>
          <v-list-tile-title>Graph</v-list-tile-title>
        </v-list-tile>

        <v-list-tile to='/SANS/Stitch' exact :active-class='activeClass'>
          <v-list-tile-title>Stitch</v-list-tile-title>
        </v-list-tile>

        <v-list-tile to='/SANS/SANS2D' exact :active-class='activeClass'>
          <v-list-tile-title>2D</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    <!-- TAS Nav Menu -->
    <v-toolbar-items class='hidden-sm-and-down' v-if='$route.meta.group === "TAS"'>
      <v-btn flat to='/TAS/Browse' exact :active-class='activeClass'>Browse</v-btn>
      <v-btn flat to='/TAS/Fit' exact :active-class='activeClass'>Graph</v-btn>
      <v-btn flat to='/TAS/Combine' exact :active-class='activeClass'>Combine</v-btn>
    </v-toolbar-items>

    <!-- TAS Drop Down Menu on Small Screens -->
    <v-menu offset-y bottom class='hidden-md-and-up' v-if='$route.meta.group === "TAS"'>
      <v-btn flat icon slot='activator'>
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-list dense>
        <v-list-tile to='/TAS/Browse' exact :active-class='activeClass'>
          <v-list-tile-title>Browse</v-list-tile-title>
        </v-list-tile>

        <v-list-tile to='/TAS/Fit' exact :active-class='activeClass'>
          <v-list-tile-title>Graph</v-list-tile-title>
        </v-list-tile>

        <v-list-tile to='/TAS/Combine' exact :active-class='activeClass'>
          <v-list-tile-title>Combine</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

  </v-toolbar>
</template>

<script>
import FetchData from './FetchData';
import UploadData from './UploadData/UploadData';

export default {
  name: 'Navbar',
  components: {
    'v-fetch-data': FetchData,
    'v-upload-data': UploadData,
  },
  computed: {
    activeClass() {
      switch (this.$vuetify.theme.name) {
        case 'white':
          return 'my-active-white';
        case 'blue':
          return 'my-active-blue';
        default:
          return 'my-active-green';
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.my-active-green {
  color: white;
  background: #00a547 !important;
}

.my-active-white {
  color: white;
  background: grey !important;
}

.my-active-blue {
  color: white;
  background: #00b0ff !important;
}
</style>