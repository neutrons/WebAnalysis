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
</div>
</template>

<script>
export default {
  name: 'Normalize',
};
</script>
