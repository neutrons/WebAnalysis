<template>
<v-app id='app-container'>
  <!-- Side Bar Component -->
  <v-sidebar :drawer='drawer'></v-sidebar>

  <v-toolbar fixed app :clipped-left='true' :clipped-right='true'>

    <v-toolbar-side-icon @click.stop="drawer = !drawer">
      <v-icon color='grey darken-4'>fa-sliders</v-icon>
    </v-toolbar-side-icon>

    <v-fetch-data></v-fetch-data>
    <v-upload-data></v-upload-data>

    <v-spacer></v-spacer>

    <v-toolbar-items class='hidden-xs-only'>
      <v-btn flat v-for='(link, index) in links' :key='index' :to='link.path' exact active-class='default-class my-active-class'>{{ link.name }}</v-btn>
    </v-toolbar-items>

    <v-menu bottom left class='hidden-sm-and-up'>
      <v-btn icon slot='activator'>
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile v-for='(link, index) in links' :key='index' :to='link.path' exact active-class='default-class my-active-class'>
          <v-list-tile-title>{{ link.name }}</v-list-tile-title>
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
