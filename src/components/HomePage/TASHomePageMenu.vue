<template>
<v-flex xs12 mb-3>
  <v-subheader>
    <div class='headline'>TAS</div>
  </v-subheader>
  <v-layout row wrap>
    <v-flex xs6 sm3 md2 pa-1>
      <v-card height='100%' hover ripple exact to='/TAS/Browse' dark>
        <v-card-media class='pa-0 pb-3'>
          <v-avatar tile class='primary icon-size'>
            <v-icon x-large dark>search</v-icon>
          </v-avatar>
        </v-card-media>

        <v-card-title class='pt-0'>
          <div>
            <h3 class='headline'>Browse Data</h3>
            <div>Quickly plot data and tag files.</div>
          </div>
        </v-card-title>

      </v-card>
    </v-flex>

    <v-flex xs6 sm3 md2 pa-1>
      <v-card height='100%' hover ripple exact to='/TAS/Fit' dark>
        <v-card-media class='pa-0 pb-3'>
          <v-avatar tile class='primary icon-size'>
            <v-icon x-large dark>trending_up</v-icon>
          </v-avatar>
        </v-card-media>

        <v-card-title class='pt-0'>
          <div>
            <h3 class='headline'>Graph Data</h3>
            <div>Plot multiple files and perform fits: Linear, Gaussian, and Lorentzian.</div>
          </div>
        </v-card-title>

      </v-card>
    </v-flex>

    <v-flex xs6 sm3 md2 pa-1>
      <v-card height='100%' hover ripple exact to='/TAS/Combine' dark>
        <v-card-media class='pa-0 pb-3'>
          <v-avatar tile class='primary icon-size'>
            <v-icon x-large dark>merge_type</v-icon>
          </v-avatar>
        </v-card-media>

        <v-card-title class='pt-0'>
          <div>
            <h3 class='headline'>Combine Data</h3>
            <div>Plot and combine multiple files.</div>
          </div>
        </v-card-title>

      </v-card>
    </v-flex>
  </v-layout>
</v-flex>
</template>

<script>
export default {
  name: 'TASHomePageMenu',
};
</script>