<template>
<v-app id='app-container' :dark='$vuetify.dark'>
  <!-- Side Bar Component -->
  <v-sidebar :drawer='drawer'></v-sidebar>

  <v-toolbar fixed app :clipped-left='true' :clipped-right='true' color='secondary' :dark='!$vuetify.dark'>

    <v-toolbar-side-icon @click.stop='drawer = !drawer' class='ml-3 mr-3'></v-toolbar-side-icon>

    <v-breadcrumbs>
      <v-icon slot='divider'>chevron_right</v-icon>
      <v-breadcrumbs-item 
        v-for='(item, index) in $route.meta.breadcrumb' :key='index'
      >
        {{ item }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
    <v-spacer></v-spacer>
    <v-toolbar-items>
    <v-fetch-data></v-fetch-data>
    <v-upload-data></v-upload-data>
    </v-toolbar-items>

    <v-toolbar-items class='hidden-sm-and-down'>
      <v-menu bottom left open-on-hover>
        <v-btn flat slot='activator'>
          SANS1D
          <v-icon right>arrow_drop_down</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile to='/SANS1D-Browse' exact :active-class='activeClass'>
            <v-list-tile-title>Browse Data</v-list-tile-title>
          </v-list-tile>

          <v-list-tile to='/SANS1D' exact :active-class='activeClass'>
            <v-list-tile-title>Graph Data</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-menu bottom left open-on-hover>
        <v-btn flat slot='activator'>
          Stitch
          <v-icon right>arrow_drop_down</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile to='/Stitch-Browse' exact :active-class='activeClass'>
            <v-list-tile-title>Browse Data</v-list-tile-title>
          </v-list-tile>

          <v-list-tile to='/Stitch' exact :active-class='activeClass'>
            <v-list-tile-title>Graph Data</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-menu bottom left open-on-hover>
        <v-btn flat slot='activator'>
          TAS
          <v-icon right>arrow_drop_down</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile to='/TAS-Browse' exact :active-class='activeClass'>
            <v-list-tile-title>Browse Data</v-list-tile-title>
          </v-list-tile>

          <v-list-tile to='/TAS' exact :active-class='activeClass'>
            <v-list-tile-title>Graph Data</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-btn flat to='SANS2D' exact :active-class='activeClass'>SANS2D</v-btn>
    </v-toolbar-items>

    <v-menu offset-y bottom class='hidden-md-and-up'>
        <v-btn flat icon slot='activator'>
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list dense>
          <v-list-tile>
            <v-menu offset-x open-on-hover>
              <v-list-tile slot='activator'>
                <v-list-tile-title>SANS1D</v-list-tile-title>
                <v-list-tile-action class='justify-end'>
                  <v-icon>play_arrow</v-icon>
                </v-list-tile-action>
              </v-list-tile>
              <v-list dense>
                <v-list-tile to='/SANS1D-Browse' exact :active-class='activeClass'>
                  <v-list-tile-title>Browse Data</v-list-tile-title>
                </v-list-tile>

                <v-list-tile to='/SANS1D' exact :active-class='activeClass'>
                  <v-list-tile-title>Graph Data</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-list-tile>
          <v-list-tile>
            <v-menu offset-x open-on-hover>
              <v-list-tile slot='activator'>
                <v-list-tile-title>Stitch</v-list-tile-title>
                <v-list-tile-action class='justify-end'>
                  <v-icon>play_arrow</v-icon>
                </v-list-tile-action>
              </v-list-tile>
              <v-list dense>
                <v-list-tile to='/Stitch-Browse' exact :active-class='activeClass'>
                  <v-list-tile-title>Browse Data</v-list-tile-title>
                </v-list-tile>

                <v-list-tile to='/Stitch' exact :active-class='activeClass'>
                  <v-list-tile-title>Graph Data</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-list-tile>
          <v-list-tile to='/SANS2D' exact :active-class='activeClass'>
            <v-list-tile-title>SANS2D</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-menu offset-x open-on-hover>
              <v-list-tile slot='activator'>
                <v-list-tile-title>TAS</v-list-tile-title>
                <v-list-tile-action class='justify-end'>
                  <v-icon>play_arrow</v-icon>
                </v-list-tile-action>
              </v-list-tile>
              <v-list dense>
                <v-list-tile to='/TAS-Browse' exact :active-class='activeClass'>
                  <v-list-tile-title>Browse Data</v-list-tile-title>
                </v-list-tile>

                <v-list-tile to='/TAS' exact :active-class='activeClass'>
                  <v-list-tile-title>Graph Data</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-list-tile>
        </v-list>
      </v-menu>

  </v-toolbar>

  <v-content>
    <transition name='fade' appear>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </v-content>

  <!-- Error Message Component -->
  <v-error></v-error>

  <v-footer fixed app>
    <v-spacer></v-spacer>
    <v-btn flat icon color='white' small @click='toggleTheme("white")'><v-icon>fa-circle</v-icon></v-btn>
    <v-btn flat icon color='blue' small @click='toggleTheme("blue")'><v-icon>fa-circle</v-icon></v-btn>
    <v-btn flat icon color='green' small @click='toggleTheme("green")'><v-icon>fa-circle</v-icon></v-btn>
    <div class='grey--text'>&copy; {{ new Date().getFullYear()}}</div>
  </v-footer>
</v-app>

</template>

<script>
import Error from './components/Error';
import Sidebar from './components/Sidebar/Sidebar';
import FetchData from './components/FetchData';
import UploadData from './components/UploadData/UploadData';

export default {
  name: 'App',
  components: {
    'v-error': Error,
    'v-sidebar': Sidebar,
    'v-fetch-data': FetchData,
    'v-upload-data': UploadData,
  },
  data() {
    return {
      drawer: true,
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
  created() {
    this.$vuetify.theme = this.themes.blue;
  },
  mounted() {
    this.getTitle();
  },
  computed: {
    links() {
      return this.$router.options.routes.slice(2, this.$router.options.routes.length);
    },
    activeClass() {
      switch (this.activeTheme) {
        case 'white':
          return 'my-active-white';
        case 'blue':
          return 'my-active-blue';
        default:
          return 'my-active-green';
      }
    },
  },
  methods: {
    getTitle() {
      document.title = `ORNL - ${this.$route.meta.title}`;
    },
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
  watch: {
    $route() {
      this.getTitle();
    },
  },
};
</script>

<style lang='scss' scoped>
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .25s;
}

.fade-enter-active {
  transition-delay: .25s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}

.my-active-green {
  color: white;
  font-weight: bold;
  background: #00C853 !important;
}

.my-active-white {
  color: white;
  font-weight: bold;
  background: grey !important;
}

.my-active-blue {
  color: white;
  font-weight: bold;
  background: #00b0ff !important;
}
</style>
