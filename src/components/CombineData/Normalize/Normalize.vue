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
    required
    :rules='[checkValue]'
  ></v-text-field>

  <v-btn outline block flat color='success' @click='normalizeData' :disabled='isNormalized || !valid'>Normalize Data</v-btn>
  <v-btn outline block flat color='warning' @click='resetNormalizeData' :disabled='!isNormalized || !valid'>Reset Data</v-btn>
</div>
</template>

<script>
export default {
  name: 'Normalize',
  data() {
    return {
      valid: true,
    };
  },
  methods: {
    checkValue(value) {
      if (typeof value !== 'number') {
        this.valid = false;
        return 'Must be a number';
      } else if (value === 0) {
        this.valid = false;
        return 'Must not equal 0. Divide by zero.';
      }

      this.valid = true;
      return true;
    },
  },
};
</script>
