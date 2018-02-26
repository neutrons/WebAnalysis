<template>
<div>
  <v-text-field
    type='number'
    label='Tolerance Bin'
    v-model.number='editTolerance'
    :step='defaultSettings.tolerance.increment'
    :min='defaultSettings.tolerance.value'
  ></v-text-field>

  <v-btn outline block flat color='success' @click='initCombineData' :disabled='combData.length > 0'>Combine Data</v-btn>
  <v-btn outline block flat color='error' @click='removeCombineData' :disabled='!combData.length'>Remove Combine Data</v-btn>
</div>
</template>

<script>
export default {
  name: 'Tolerance',
};
</script>
