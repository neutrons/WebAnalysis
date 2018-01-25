<template>
<v-app id='app-container'>
  <!-- Side Bar Component -->
  <v-sidebar :drawer='drawer'></v-sidebar>

  <v-toolbar fixed app :clipped-left='true' :clipped-right='true'>

    <v-toolbar-side-icon @click.stop='drawer = !drawer' class='ml-3 mr-3'>
      <v-icon color='grey darken-4'>fa-sliders</v-icon>
    </v-toolbar-side-icon>

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

    <v-toolbar-items class='hidden-xs-down'>
      <v-menu bottom left open-on-hover>
        <v-btn flat slot='activator'>
          SANS1D
          <v-icon right>arrow_drop_down</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile to='/SANS1D-Browse' exact active-class='my-active-class'>
            <v-list-tile-title>Browse Data</v-list-tile-title>
          </v-list-tile>

          <v-list-tile to='/SANS1D' exact active-class='my-active-class'>
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
          <v-list-tile to='/Stitch-Browse' exact active-class='my-active-class'>
            <v-list-tile-title>Browse Data</v-list-tile-title>
          </v-list-tile>

          <v-list-tile to='/Stitch' exact active-class='my-active-class'>
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
          <v-list-tile to='/TAS-Browse' exact active-class='my-active-class'>
            <v-list-tile-title>Browse Data</v-list-tile-title>
          </v-list-tile>

          <v-list-tile to='/TAS' exact active-class='my-active-class'>
            <v-list-tile-title>Graph Data</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-btn flat to='SANS2D' exact active-class='my-active-class'>SANS2D</v-btn>
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
                <v-list-tile to='/SANS1D-Browse' exact active-class='my-active-class'>
                  <v-list-tile-title>Browse Data</v-list-tile-title>
                </v-list-tile>

                <v-list-tile to='/SANS1D' exact active-class='my-active-class'>
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
                <v-list-tile to='/Stitch-Browse' exact active-class='my-active-class'>
                  <v-list-tile-title>Browse Data</v-list-tile-title>
                </v-list-tile>

                <v-list-tile to='/Stitch' exact active-class='my-active-class'>
                  <v-list-tile-title>Graph Data</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-list-tile>
          <v-list-tile to='/SANS2D' exact active-class='my-active-class'>
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
                <v-list-tile to='/TAS-Browse' exact active-class='my-active-class'>
                  <v-list-tile-title>Browse Data</v-list-tile-title>
                </v-list-tile>

                <v-list-tile to='/TAS' exact active-class='my-active-class'>
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
    };
  },
  mounted() {
    this.getTitle();
  },
  computed: {
    links() {
      return this.$router.options.routes.slice(2, this.$router.options.routes.length);
    },
  },
  methods: {
    getTitle() {
      document.title = `ORNL - ${this.$route.meta.title}`;
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

.my-active-class {
  color: white;
  font-weight: bold;
  background: rgb(76, 175, 80) !important;
}
</style>
