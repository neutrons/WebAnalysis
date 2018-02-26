<template>
<div>
  <v-text-field
    type='number'
    label='Tolerance Bin'
    v-model.number='editTolerance'
    :step='defaultSettings.tolerance.increment'
    :min='defaultSettings.tolerance.value'
    required
    :rules='[checkValue]'
  ></v-text-field>

  <v-btn outline block flat color='success' @click='initCombineData' :disabled='!valid'>Combine Data</v-btn>
  <v-btn outline block flat color='error' @click='removeCombineData' :disabled='!combData.length || !valid'>Remove Combine Data</v-btn>
</div>
</template>

<script>
export default {
  name: 'Tolerance',
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
      } else if (value < 0) {
        this.valid = false;
        return 'Must be greater than 0';
      }

      this.valid = true;
      return true;
    },
  },
};
</script>
