<template>
<v-expansion-panel flat>
  <v-expansion-panel-content :value='!collapse' class='green white--text'>
    <div slot='header' class='title'>Tools</div>

    <v-container class='grey lighten-4'>
      <v-layout row wrap>
        <!-- Toggle Zoom-Brush -->
        <v-flex xs12>
          <v-toggle-zoom-brush />
        </v-flex>

        <!-- Stitch Data Btn -->
        <v-flex xs12>
          <v-stitch-btn />
        </v-flex>

        <!-- Draw Saved Brushes Btn -->
        <v-flex xs12>
          <v-draw-brushes-btn />
        </v-flex>

        <!-- Save Stitch Line Btn -->
        <v-flex xs12>
          <v-save-stitch-btn />
        </v-flex>

        <!-- Remove Brushes Btn -->
        <v-flex xs12>
          <v-remove-brushes-btn />
        </v-flex>
        
      </v-layout>
    </v-container>
  </v-expansion-panel-content>
</v-expansion-panel>
</template>

<script>
import ToggleZoomBrush from './ToggleZoomBrush';
import StitchBtn from './StitchBtn';
import RemoveBrushesBtn from './RemoveBrushesBtn';
import SaveStitchBtn from './SaveStitchBtn';
import DrawBrushesBtn from './DrawBrushesBtn';

export default {
  name: 'Tools',
  props: {
    collapse: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    'v-toggle-zoom-brush': ToggleZoomBrush,
    'v-stitch-btn': StitchBtn,
    'v-remove-brushes-btn': RemoveBrushesBtn,
    'v-save-stitch-btn': SaveStitchBtn,
    'v-draw-brushes-btn': DrawBrushesBtn,
  },
};
</script>

<style lang='scss' scoped>

</style>
