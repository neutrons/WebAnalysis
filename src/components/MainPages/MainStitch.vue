<template>
    <div>
      <keep-alive>
        <v-chart :ID='ID'>

          <template slot-scope='props' slot='toolbar-slot'>
            <v-stitch-btn />
            <v-remove-brushes-btn />
            <v-save-stitch-btn />
            <v-draw-brushes-btn />
            <v-toggle-zoom-brush />
          </template>

        </v-chart>
      </keep-alive>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import filesToPlotWatcher from './filesToPlotWatcher';
import read1DData from '../../assets/js/readFiles/default';
import parseData from '../../assets/js//readFiles/parse/SANS1D';

export default {
  name: 'Stitch',
  mixins: [
    filesToPlotWatcher,
    read1DData,
    parseData,
  ],
  components: {
    'v-chart': () => import('../Chart1D/ChartStitch'),
    'v-toggle-zoom-brush': () => import('../toggleZoomBrush'),
    'v-stitch-btn': () => import('../stitchButton'),
    'v-remove-brushes-btn': () => import('../removeBrushesButton'),
    'v-save-stitch-btn': () => import('../saveStitchButton'),
    'v-draw-brushes-btn': () => import('../drawBrushesButton'),
  },
  computed: {
    ...mapState('Stitch', {
      ID: state => state.ID,
      filesToPlot: state => state.filesSelected,
      fileToFit: state => state.fileToFit,
    }),
    ...mapGetters('Stitch', [
      'getURLs',
      'getSavedFile',
    ]),
  },
  methods: {
    ...mapMutations('Stitch', [
      'setCurrentData',
      'resetFitConfiguration',
      'storeData',
      'resetAll',
    ]),
  },
};
</script>