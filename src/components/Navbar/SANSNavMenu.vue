<template>
<v-toolbar-items >
  <!-- SANS Nav Menu -->
  <v-btn flat to='/SANS/Browse' exact :active-class='activeClass' class='hidden-sm-and-down'>Browse</v-btn>
  <v-btn flat to='/SANS/Fit' exact :active-class='activeClass' class='hidden-sm-and-down'>Graph</v-btn>
  <v-btn flat to='/SANS/Stitch' exact :active-class='activeClass' class='hidden-sm-and-down'>Stitch</v-btn>
  <v-btn flat to='/SANS/SANS2D' exact :active-class='activeClass' class='hidden-sm-and-down'>2D</v-btn>

  <!-- SANS Drop Down Menu on Small Screens -->
  <v-menu offset-y bottom class='hidden-md-and-up'>
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
</v-toolbar-items>
</template>

<script>
import activeClass from './activeClassMixin';

export default {
  name: 'SANSNavMenu',
  mixins: [
    activeClass,
  ],
};

</script>