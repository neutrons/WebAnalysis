<template>
  <div>
    <v-text-field
      type='text'
      label='Combine Name'
      v-model='editCombineName'
      required
      hint='Type name of combined data curve'
      :rules='[checkName]'
    ></v-text-field>

    <v-tooltip top :close-delay='1' :disabled='!validName'>
      <v-btn slot='activator' outline block flat color='success' @click='onSaveCombinedData' :disabled='!validName'>Store Combine</v-btn>
      <span>Click to store combined data curve</span>
    </v-tooltip>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { eventBus } from '../../../assets/js/eventBus';

export default {
  name: 'SaveCombinedDataTAS',
  data() {
    return {
      validName: true,
      editCombineName: 'combined_data',
    };
  },
  computed: {
    ...mapState('TAS', {
      fetched: state => state.fetched,
      uploaded: state => state.uploaded,
    }),
    ...mapState('TAS/Combine', {
      storedCombined: state => state.storedCombined,
    }),
    filenameList() {
      const k1 = Object.keys(this.fetched);
      const k2 = Object.keys(this.uploaded);
      const k3 = Object.keys(this.storedCombined);
      return [].concat.apply([], [k1, k2, k3]);
    },
  },
  methods: {
    ...mapActions('TAS/Combine', [
      'storeCombinedData',
    ]),
    checkName(value) {
      const str = value.trim();

      if (typeof str !== 'string') {
        this.validName = false;
        return 'Must be a string';
      } else if (str.length < 1) {
        this.validName = false;
        return 'Invalid name. Name must be 1+ characters long.';
      } else if (this.filenameList.indexOf(str) !== -1) {
        this.validName = false;
        return 'Duplice name. Name already exists.';
      } else if (str === 'combine') {
        this.validName = false;
        return 'Cannot name \'combine\'. Reserved word.';
      }

      this.validName = true;
      return true;
    },
    onSaveCombinedData() {
      const group = this.$route.meta.group;
      this.storeCombinedData({ group, name: this.editCombineName })
        .then(() => {
          eventBus.$emit('redraw-chart-tas-combine');
        })
        .catch((error) => {
          eventBus.$emit('add-notification', error.message, 'error');
        });
    },
  },
};
</script>