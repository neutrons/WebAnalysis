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

          <template slot-scope='props' slot='tabs-slot'>
            <v-slide-y-transition>
                <v-flex xs12 v-if='props.stitchedData.length'>
                  <div v-show='props.showTabs'>
                    <v-tabs v-model='props.activeParentTab'>

                        <v-tabs-bar dark color='blue lighten-1' v-if='props.stitchedData'>
                            <v-tabs-item href='#tab-fit' ripple v-if='props.stitchedData'>Stitch Results</v-tabs-item>
                            <v-tabs-slider color='yellow'></v-tabs-slider>
                        </v-tabs-bar>

                        <!-- nested tab items  -->
                        <v-tabs-items>
                          <!-- fit results tab content -->
                          <v-tabs-content id='tab-fit' ripple v-if='props.stitchedData'>
                            <v-tabs>
                              <v-tabs-bar dark color='blue lighten-3'>
                                <v-tabs-slider color='yellow'></v-tabs-slider>
                                <v-tabs-item href='fit-results'>
                                  Selected Regions
                                </v-tabs-item>

                                <v-tabs-item href='fit-data'>
                                  Stitched Data
                                </v-tabs-item>
                              </v-tabs-bar>

                              <v-tabs-items>
                                <v-tabs-content id='fit-results'>
                                  <v-card flat>
                                    <v-list>
                                      <template v-for='(item, key, index) in props.brushSelections'>
                                        <v-list-tile :key='index'>
                                          <v-list-tile-avatar>
                                            <v-icon color='blue'>crop_free</v-icon>
                                          </v-list-tile-avatar>
                                          <v-list-tile-content>
                                            <span class='hidden-sm-and-down'>{{ key }}</span>
                                            <span class='hidden-md-and-up'> {{ index }}</span>
                                          </v-list-tile-content>
                                          <v-list-tile-content>
                                            {{ item.converted[0].toExponential(2) }} : {{ item.converted[1].toExponential(2) }}
                                          </v-list-tile-content>
                                        </v-list-tile>
                                        <v-divider v-if='index < Object.keys(props.brushSelections).length - 1' :key='key'></v-divider>
                                      </template>
                                    </v-list>
                                  </v-card>
                                </v-tabs-content>


                                <v-tabs-content id='fit-data'>
                                    <v-stitched-data-table :stitched-data='props.stitchedData' :files-stitched='props.filesSelected'></v-stitched-data-table>
                                </v-tabs-content>
                                </v-tabs-items>
                            </v-tabs>
                          </v-tabs-content>
                        </v-tabs-items>
                    <!-- end of nested tab items -->
                    </v-tabs>
                  </div>
                </v-flex>
              </v-slide-y-transition>
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
    'v-stitched-data-table': () => import('../StitchedDataTable'),
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