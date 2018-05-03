<template>
<v-dialog v-model='show' persistent max-width='50%'>
  <v-card>
    <v-card-title class='headline secondary white--text'>
      Edit VCorr Values

      <v-spacer></v-spacer>
      <v-btn outline dark @click='onCopyDataToClipboard'>
        Copy All to Clipboard
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-layout row wrap>
        <v-flex xs12 md4 pl-3 pr-3 v-for='(anode, index) in newValues' :key='index'>
          <v-text-field
            :label='`Anode ${index + 1}`'
            v-model.number='newValues[index]'
            type='number'
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color='red' outline @click='onCancel'>Cancel Edit</v-btn>
      <v-btn color='success' outline @click='onSave'>Save Edit</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { eventBus } from '../../../../assets/js/eventBus';

export default {
  name: 'VCorrEdit',
  created() {
    this.newValues = [...this.VCorrValues];
  },
  data() {
    return {
      show: true,
      newValues: [],
    };
  },
  computed: {
    ...mapState('POWDER/Combine', {
      VCorrValues: state => state.normalizeByVCorr,
    }),
  },
  methods: {
    ...mapMutations('POWDER/Combine', [
      'setNormalizeByVCorr',
    ]),
    onCancel() {
      this.$emit('cancel-edit');
    },
    onSave() {
      this.setNormalizeByVCorr(this.newValues);
      this.$emit('cancel-edit');
    },
    onCopyDataToClipboard() {
      const temp = document.createElement('textarea');
      document.body.appendChild(temp);

      const text = this.newValues.join('\r\n');
      temp.value = text;
      temp.select();
      document.execCommand('copy');
      document.body.removeChild(temp);

      eventBus.$emit('add-notification', 'Copied to clipboard!', 'success');
    },
  },
};
</script>