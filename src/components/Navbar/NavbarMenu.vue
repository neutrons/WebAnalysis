<template>
<v-toolbar-items>
  <v-btn v-for='link in links' :key='link.title' flat :to='link.path' exact :active-class='activeClass' class='hidden-sm-and-down'>
    {{ link.title }}
  </v-btn>

  <v-menu offset-y bottom class='hidden-md-and-up'>
    <v-btn flat icon slot='activator'>
      <v-icon>more_vert</v-icon>
    </v-btn>
    <v-list dense>
      <v-list-tile v-for='link in links' :key='link.title' :to='link.path' exact :active-class='activeClass'>
        <v-list-tile-title>{{ link.title }}</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</v-toolbar-items>
</template>

<script>
import activeClass from './activeClassMixin';
import POWDERLinks from '../HomePage/POWDERLinks';
import SANSLinks from '../HomePage/SANSLinks';
import TASLinks from '../HomePage/TASLinks';

export default {
  name: 'NavbarMenu',
  mixins: [
    activeClass,
  ],
  data() {
    return {
      POWDERLinks,
      SANSLinks,
      TASLinks,
    };
  },
  computed: {
    links() {
      switch (this.$route.meta.group) {
        case 'SANS':
          return this.SANSLinks;
        case 'TAS':
          return this.TASLinks;
        case 'POWDER':
        default:
          return this.POWDERLinks;
      }
    },
  },
};

</script>