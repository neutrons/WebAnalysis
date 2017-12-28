<template>
  <v-container text-xs-center>
    <h1 class='primary--text'>{{msg}}</h1>
    <p>Page doesn't exit</p>
  </v-container>
</template>

<script>
export default {
  name: 'ORNL404',
  data() {
    return {
      msg: '404!',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>

</style>
