<template>
<div>
  <v-select
    label='Normalize Variable'
    hide-selected
    chips
    v-model='editNormalizeField'
    :items='normalizeOptions'
    
  ></v-select>

  <v-text-field 
    label='Normalize To'
    type='number'
    v-model.number='editNormalizeValue'
    :step='defaultSettings.normalize.increment'
  ></v-text-field>

  <v-btn outline block flat color='success' @click='normalizeData' :disabled='isNormalized'>Normalize Data</v-btn>
  <v-btn outline block flat color='warning' @click='resetNormalizeData' :disabled='!isNormalized'>Reset Data</v-btn>
</div>
</template>

<script>
export default {
  name: 'Normalize',
};
</script>
