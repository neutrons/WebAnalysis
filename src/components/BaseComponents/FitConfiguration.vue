<template>
<v-expansion-panel flat>
  <v-expansion-panel-content :value='false' class='green'>
    <div slot='header' class='title white--text'>Fit Configuration</div>

    <v-container class='grey lighten-4'>
      <v-layout row wrap>

        <v-flex xs12>
          Fit configs will go here...
        </v-flex>

      </v-layout>
    </v-container>
  </v-expansion-panel-content>
</v-expansion-panel>
</template>

<script>
export default {
  name: 'FitConfiguration',
};
</script>

<style lang='scss' scoped>
</style>