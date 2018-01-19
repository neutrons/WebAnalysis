<template>
    <div>
      <keep-alive>
        <v-chart :ID='ID'>

          <template slot-scope='props' slot='toolbar-slot'>
            <v-toggle-zoom-brush @toggle-edit='props.toggleEdit' />
            <div v-if='$vuetify.breakpoint.lgAndUp'>
              <v-stitch-btn @stitch-data='props.stitchData' />
              <v-remove-brushes-btn @remove-brushes='props.removeBrushes' />
              <v-remove-stitch-btn @remove-stitch='props.removeStitchLine' />
              <v-save-stitch-btn />
              <v-draw-brushes-btn />
            </div>

            <v-menu bottom v-if='$vuetify.breakpoint.mdAndDown'>
              <v-btn :icon='$vuetify.breakpoint.mdAndDown' slot='activator' flat dark small>
                <span class='hidden-md-and-down'>Stitch options</span>
                <v-icon :right='!$vuetify.breakpoint.mdAndDown'>more_vert</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile @click='props.stitchData'>
                  <v-list-tile-action>
                    <v-icon>show_chart</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>Stitch Data</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click='props.removeBrushes'>
                  <v-list-tile-action>
                    <v-icon>grid_off</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>Remove Brushes</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click='props.removeStitchLine'>
                  <v-list-tile-action>
                    <v-icon>remove</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>Remove Stitch</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon>fa-floppy-o</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>Store Brushes</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon>border_color</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title>Draw Stored Brushes</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
            </v-menu>
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
    'v-remove-stitch-btn': () => import('../removeStitchButton'),
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