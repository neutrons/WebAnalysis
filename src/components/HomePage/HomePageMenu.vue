<template>
<v-flex xs12 mb-3>
  <v-subheader>
    <div class='headline'>{{ header }}</div>
  </v-subheader>
  <v-layout row wrap>
    <v-flex xs6 sm3 md2 pa-1 v-for='link in links' :key='link.title'>
      <v-card height='100%' hover ripple exact :to='link.path' dark>
        <v-card-media class='pa-0 pb-3'>
          <v-avatar tile class='primary icon-size'>
            <v-icon x-large dark>{{ link.icon }}</v-icon>
          </v-avatar>
        </v-card-media>

        <v-card-title class='pt-0'>
          <div>
            <h3 class='headline'>{{ link.title }}</h3>
            <div>{{ link.description }}</div>
          </div>
        </v-card-title>

      </v-card>
    </v-flex>
  </v-layout>
</v-flex>
</template>

<script>
export default {
  name: 'HomePageMenu',
  props: {
    header: {
      type: String,
      default: 'Header',
    },
    links: {
      type: Array,
      required: true,
    },
  },
};
</script>