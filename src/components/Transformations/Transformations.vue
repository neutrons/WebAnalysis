<template>
<v-expansion-panel flat>
  <v-expansion-panel-content :value='!collapse'>
    <div slot='header' class='title'>Transformations</div>

    <v-container>
      <v-layout row wrap>

        <v-flex xs12>
          <v-text-field
            label='X Transformation'
            v-model='xTransformation'
            ref='xTransformation'
            :rules='[validateX, validateLength]'
            required
            @keydown.enter.native='enterX'
            />

          <v-text-field
            label='Y Transformation'
            v-model='yTransformation'
            ref='yTransformation'
            :rules='[validateY, validateLength]'
            required
            @keydown.enter.native='enterY'
            />

          <v-btn block outline @click='setAllTransformations' :disabled='!canEnter' color='success'>
            Transform Data
          </v-btn>

          <v-btn block outline @click='resetAllTransformations' color='warning'>
            <v-icon left>fa-undo</v-icon>
            <span>Reset Transformations</span>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-expansion-panel-content>
</v-expansion-panel>
</template>

<script>
import math from 'mathjs';
import { eventBus } from '../../assets/js/eventBus';

export default {
  name: 'Transformations',
  props: {
    collapse: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      xTransformation: '',
      yTransformation: '',
      errorX: false,
      errorY: false,
    };
  },
  computed: {
    canEnter() {
      return !this.errorY
        && !this.errorX
        && this.xTransformation.length > 0
        && this.yTransformation.length > 0;
    },
    redrawName() {
      return `redraw-chart-${this.$route.meta.group.toLowerCase()}-${this.$route.meta.feature.toLowerCase()}`;
    },
  },
  methods: {
    validateX(expression) {
      this.errorX = !this.validateEntry(expression);

      return !this.errorX || 'Transformation should include constants or coefficients (x or y).';
    },
    validateY(expression) {
      this.errorY = !this.validateEntry(expression);

      return !this.errorY || 'Transformation should include constants or coefficients (x or y).';
    },
    validateEntry(expression) {
      // Function to check that user did not enter a transformation that doesn't include 'x' or 'y'
      // E.g. x*2+c would throw an error
      let nodeParsed = null;

      // Mathjs to parse each transformation into a node
      try {
        nodeParsed = math.parse(expression);
      } catch (reason) {
        return false;
      }

      const filtered = nodeParsed.filter(node => node.isSymbolNode && node.name !== 'x' && node.name !== 'y');

      return filtered.length === 0;
    },
    validateLength(expression) {
      return expression.length !== 0 || 'There must be a transformation.';
    },
    resetAllTransformations() {
      // trigger action to reset transformations then
      // transform data back to original then update plot
      this.resetTransformations()
        .then(() => this.transformData())
        .then(() => {
          eventBus.$emit(this.redrawName);
        })
        .catch((error) => {
          eventBus.$emit('add-notification', error.message, 'error');
        });
    },
    enterX() {
      if (this.canEnter) {
        // trigger action to set x transformation then transform data then update plot
        this.setXTransformation(this.xTransformation)
          .then(() => this.transformData())
          .then(() => {
            eventBus.$emit(this.redrawName);
          })
          .catch((error) => {
            eventBus.$emit('add-notification', error.message, 'error');
          });
      }
    },
    enterY() {
      if (this.canEnter) {
        // trigger action to set y transformation then transform data then update plot
        this.setYTransformation(this.yTransformation)
          .then(() => this.transformData())
          .then(() => {
            eventBus.$emit(this.redrawName);
          })
          .catch((error) => {
            eventBus.$emit('add-notification', error.message, 'error');
          });
      }
    },
    setAllTransformations() {
      if (this.canEnter) {
        // trigger action to set both transformations then transform data then update plot
        this.setXTransformation(this.xTransformation)
          .then(() => this.setYTransformation(this.yTransformation))
          .then(() => this.transformData())
          .then(() => {
            eventBus.$emit(this.redrawName);
          })
          .catch((error) => {
            eventBus.$emit('add-notification', error.message, 'error');
          });
      }
    },
  },
  watch: {
    xTrans() {
      this.xTransformation = this.xTrans;
    },
    yTrans() {
      this.yTransformation = this.yTrans;
    },
  },
};

</script>

<style lang='scss' scoped>
</style>