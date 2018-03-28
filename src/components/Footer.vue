<template>
  <v-footer fixed app dark>
    <v-spacer></v-spacer>

    <v-btn flat icon color='white' small @click='toggleTheme("white")'>
      <v-icon>fa-circle</v-icon>
    </v-btn>

    <v-btn flat icon color='blue' small @click='toggleTheme("blue")'>
      <v-icon>fa-circle</v-icon>
    </v-btn>

    <v-btn flat icon color='green' small @click='toggleTheme("green")'>
      <v-icon>fa-circle</v-icon>
    </v-btn>

    <div class='grey--text'>&copy; {{ new Date().getFullYear()}}</div>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      activeTheme: 'green',
      themes: {
        white: {
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#00a547',
          warning: '#FFC107',
          name: 'white',
        },
        blue: {
          primary: '#00b0ff',
          secondary: '#1976D2',
          accent: '#1976D2',
          error: '#FF5252',
          info: '#2196F3',
          success: '#00a547',
          warning: '#FFC107',
          name: 'blue',
        },
        green: {
          primary: '#00a547',
          secondary: '#005725',
          accent: '#005725',
          error: '#FF5252',
          info: '#2196F3',
          success: '#00a547',
          warning: '#FFC107',
          name: 'green',
        },
      },
    };
  },
  created() {
    this.$vuetify.theme = this.themes.green;
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
};
</script>

<style lang='scss' scoped>
</style>