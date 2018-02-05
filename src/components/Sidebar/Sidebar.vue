<template>
    <v-navigation-drawer
        :clipped='true'
        v-model='toggle'
        disable-resize-watcher
        disable-route-watcher
        fixed
        app
        hide-overlay
        width='450'
        mobile-break-point='600'
        :dark='$vuetify.theme.name !== "white"'
    >

    <keep-alive>
      <component :is='$route.meta.sidebar'></component>
    </keep-alive>

<v-footer fixed>
    <v-btn flat icon color='white' small @click='toggleTheme("white")'><v-icon>fa-circle</v-icon></v-btn>
    <v-btn flat icon color='blue' small @click='toggleTheme("blue")'><v-icon>fa-circle</v-icon></v-btn>
    <v-btn flat icon color='green' small @click='toggleTheme("green")'><v-icon>fa-circle</v-icon></v-btn>
    <v-spacer></v-spacer>
    <div class='grey--text'>&copy; {{ new Date().getFullYear()}}</div>
  </v-footer>
    </v-navigation-drawer>
</template>

<script>
export default {
  name: 'Sidebar',
  components: {
    SidebarSANS1D: () => import('./SANS1D/SidebarSANS1D'),
    SidebarSANS2D: () => import('./SANS2D/SidebarSANS2D'),
    SidebarStitch: () => import('./Stitch/SidebarStitch'),
    SidebarTAS: () => import('./TAS/SidebarTAS'),
    Sidebar404: () => import('./Sidebar404'),
    SidebarSANS1DBrowse: () => import('./SANS1D/SidebarSANS1DBrowse'),
    SidebarStitchBrowse: () => import('./Stitch/SidebarStitchBrowse'),
    SidebarTASBrowse: () => import('./TAS/SidebarTASBrowse'),
  },
  props: {
    drawer: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      activeTheme: 'blue',
      themes: {
        white: {
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          name: 'white',
        },
        blue: {
          primary: '#00b0ff',
          secondary: '#1976D2', // green
          accent: '#1976D2', // tab color
          error: '#FF5252',
          info: '#2196F3',
          success: '#43A047',
          warning: 'orange',
          name: 'blue',
        },
        green: {
          primary: '#00C853', // green
          secondary: '#43A047',
          accent: '#43A047', // tab color
          error: '#FF5252',
          info: '#2196F3',
          success: '#43A047',
          warning: 'orange',
          name: 'green',
        },
      },
    };
  },
  computed: {
    toggle: {
      get() {
        return this.drawer;
      },
      set() {},
    },
  },
  methods: {
    toggleTheme(theme) {
      switch (theme) {
        case 'white':
          this.activeTheme = 'white';
          this.$vuetify.theme = this.themes[theme];
          break;
        case 'blue':
          this.activeTheme = 'blue';
          this.$vuetify.theme = this.themes[theme];
          break;
        default:
          this.activeTheme = 'green';
          this.$vuetify.theme = this.themes[theme];
      }
    },
  },
  created() {
    this.$vuetify.theme = this.themes.blue;
  },
};
</script>

<style lang='scss'>
.chip__close {
  color: black !important;
}
</style>
