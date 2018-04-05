<template>
<v-toolbar-items>
  <!-- POWDER Nav Menu -->
  <v-btn flat to='/POWDER/Browse' exact :active-class='activeClass' class='hidden-sm-and-down'>Browse</v-btn>
  <v-btn flat to='/POWDER/Fit' exact :active-class='activeClass' class='hidden-sm-and-down'>Graph</v-btn>
  <v-btn flat :active-class='activeClass' class='hidden-sm-and-down'>Normalize</v-btn>

  <!-- POWDER Drop Down Menu on Small Screens -->
  <v-menu offset-y bottom class='hidden-md-and-up'>
    <v-btn flat icon slot='activator'>
      <v-icon>more_vert</v-icon>
    </v-btn>
    <v-list dense>
      <v-list-tile to='/POWDER/Browse' exact :active-class='activeClass'>
        <v-list-tile-title>Browse</v-list-tile-title>
      </v-list-tile>

      <v-list-tile to='/POWDER/Fit' exact :active-class='activeClass'>
        <v-list-tile-title>Graph</v-list-tile-title>
      </v-list-tile>

      <v-list-tile :active-class='activeClass'>
        <v-list-tile-title>Normalize</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</v-toolbar-items>
</template>

<script>
import activeClass from './activeClassMixin';

export default {
  name: 'POWDERNavMenu',
  mixins: [
    activeClass,
  ],
};

</script>