<template>
<v-expansion-panel flat>
  <v-expansion-panel-content :value='!collapse' class='green'>
    <div slot='header' class='title white--text'>Transformations</div>

    <v-container class='grey lighten-4'>
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

          <v-btn block outline @click='setTransformations' color='green darken-1 white--text' :disabled='!canEnter'>
            Transform Data
          </v-btn>

          <v-btn block outline @click='resetTransformations' color='orange darken-1 white--text'>
            <v-icon left color='orange darken-1'>fa-undo</v-icon> Reset Transformations
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-expansion-panel-content>
</v-expansion-panel>
</template>

<script>
import math from 'mathjs';
import getTitle from '../../assets/js/getTitle';

export default {
  name: 'Transformations',
  mixins: [
    getTitle,
  ],
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
  created() {
    this.xTransformation = this.$store.state[this.title].transformations.x;
    this.yTransformation = this.$store.state[this.title].transformations.y;
  },
  computed: {
    canEnter() {
      return !this.errorY
        && !this.errorX
        && this.xTransformation.length > 0
        && this.yTransformation.length > 0;
    },
    xTrans() {
      return this.$store.state[this.title].transformations.x;
    },
    yTrans() {
      return this.$store.state[this.title].transformations.y;
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
    resetTransformations() {
      this.$store.commit(`${this.title}/resetTransformations`);
      this.$store.commit(`${this.title}/transformData`);
    },
    enterX() {
      if (this.canEnter) {
        this.$store.commit(`${this.title}/setXTransformation`, this.xTransformation);
        this.$store.commit(`${this.title}/transformData`);
      }
    },
    enterY() {
      if (this.canEnter) {
        this.$store.commit(`${this.title}/setYTransformation`, this.yTransformation);
        this.$store.commit(`${this.title}/transformData`);
      }
    },
    setTransformations() {
      if (this.canEnter) {
        this.$store.commit(`${this.title}/setTransformations`, {
          x: this.xTransformation,
          y: this.yTransformation,
        });
        this.$store.commit(`${this.title}/transformData`);
      }
    },
  },
  watch: {
    xTrans() {
      console.log('X Trans changed');
      this.xTransformation = this.xTrans;
    },
    yTrans() {
      console.log('Y Trans changed');
      this.yTransformation = this.yTrans;
    },
  },
};

</script>

<style lang='scss' scoped>
</style>