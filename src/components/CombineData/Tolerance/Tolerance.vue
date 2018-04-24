<template>
<div>
  <v-text-field
    type='number'
    label='Tolerance Bin'
    v-model.number='editTolerance'
    :step='defaultSettings.tolerance.increment'
    :min='defaultSettings.tolerance.value'
    required
    hint='Type value for bin tolerance range'
    :rules='[checkValue]'
  ></v-text-field>

  <v-tooltip top :close-delay='1' :disabled='!valid'>
    <v-btn slot='activator' outline block flat color='success' @click='onCombineData' :disabled='!valid'>Combine Data</v-btn>
    <span>Click to combine data</span>
  </v-tooltip>

  <v-tooltip top :close-delay='1' :disabled='!combData.length || !valid'>
    <v-btn slot='activator' outline block flat color='error' @click='onRemoveCombinedData' :disabled='!combData.length || !valid'>Remove Combined Data</v-btn>
    <span>Click to remove combined data</span>
  </v-tooltip>

  <!-- If data is combined reveal component for saving combined data -->
  <v-fade-transition>
    <v-save-combined v-if='combData.length'></v-save-combined>
  </v-fade-transition>
</div>
</template>

<script>
import { eventBus } from '../../../assets/js/eventBus';

export default {
  name: 'Tolerance',
  data() {
    return {
      valid: true,
    };
  },
  computed: {
    editTolerance: {
      get() {
        return this.tolerance;
      },
      set(value) {
        this.setTolerance(value);
      },
    },
    group() {
      return this.$route.meta.group.toLowerCase();
    },
  },
  methods: {
    checkValue(value) {
      // check value validates for correct input in bin tolerance
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
    onCombineData() {
      // trigger action to combine data then update chart
      this.combineData(this.getPreparedData)
        .then(() => {
          eventBus.$emit(`redraw-chart-${this.group}-combine`);
        })
        .catch((error) => {
          eventBus.$emit('add-notification', error.message, 'error');
        });
    },
    onRemoveCombinedData() {
      this.removeCombinedData()
        .then(() => {
          eventBus.$emit(`redraw-chart-${this.group}-combine`);
        })
        .catch((error) => {
          eventBus.$emit('add-notification', error, 'error');
        });
    },
  },
};
</script>
