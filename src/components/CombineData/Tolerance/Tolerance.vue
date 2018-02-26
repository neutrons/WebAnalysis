<template>
  <v-text-field
    type='number'
    label='Tolerance Bin'
    v-model.number='editTolerance'
    :step='defaultSettings.tolerance.increment'
    :min='defaultSettings.tolerance.value'
  ></v-text-field>
</template>

<script>
export default {
  name: 'Tolerance',
};
</script>
