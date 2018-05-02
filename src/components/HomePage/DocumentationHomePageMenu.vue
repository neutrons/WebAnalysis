<template>
<v-flex xs12 mb-3>
  <v-subheader>
    <div class='headline'>Documentation</div>
  </v-subheader>
  <v-layout row wrap>
    <v-flex xs6 sm3 md2 pa-1>
      <v-card height='100%' hover ripple exact to='/Documentation' dark>
        <v-card-media class='pa-0 pb-3'>
          <v-avatar tile class='primary icon-size'>
            <v-icon x-large dark>fa-book</v-icon>
          </v-avatar>
        </v-card-media>

        <v-card-title class='pt-0'>
          <div>
            <h3 class='headline'>Guide</h3>
            <div>Brief run-through of application.</div>
          </div>
        </v-card-title>

      </v-card>
    </v-flex>

    <v-flex xs6 sm3 md2 pa-1>
      <v-card height='100%' hover ripple dark>
        <v-card-media class='pa-0 pb-3'>
          <v-avatar tile class='primary icon-size'>
            <v-icon x-large dark>fa-question</v-icon>
          </v-avatar>
        </v-card-media>

        <v-card-title class='pt-0'>
          <div>
            <h3 class='headline'>FAQs</h3>
          </div>
        </v-card-title>

      </v-card>
    </v-flex>
  </v-layout>
</v-flex>
</template>

<script>
export default {
  name: 'DocumentationHomePageMenu',
};
</script>