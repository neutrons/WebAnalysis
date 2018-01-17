<template>
  <div>
    <keep-alive>
        <v-chart :ID='ID'>
        <template slot-scope='props' slot='tabs-slot'>
            <v-slide-y-transition>
            <v-flex xs12>
                <div v-show='props.showTabs'>
                <v-tabs v-model='props.activeParentTab'>

                    <v-tabs-bar dark color='blue lighten-1' v-if='props.fileToFit || props.metadataLength > 0'>
                    <v-tabs-item href='#tab-fit' ripple v-if='props.fileToFit'>Fit</v-tabs-item>
                    <v-tabs-item href='#tab-metadata' ripple v-if='props.metadataLength > 0'>Metadata</v-tabs-item>
                    <v-tabs-slider color='yellow'></v-tabs-slider>
                    </v-tabs-bar>

                    <!-- nested tab items  -->
                    <v-tabs-items>
                    <!-- fit results tab content -->
                    <v-tabs-content id='tab-fit' ripple v-if='props.fileToFit'>
                        <v-tabs>
                        <v-tabs-bar dark color='blue lighten-3'>
                            <v-tabs-slider color='yellow'></v-tabs-slider>
                            <v-tabs-item href='fit-results'>
                            Fit Results
                            </v-tabs-item>

                            <v-tabs-item href='fit-data'>
                            Fitted Data
                            </v-tabs-item>
                        </v-tabs-bar>

                        <v-tabs-items>
                            <v-tabs-content id='fit-results'>
                            <v-card flat>
                                <v-card-text>
                                <v-fit-results-table :x-scale='props.xScale'></v-fit-results-table>
                                </v-card-text>
                            </v-card>
                            </v-tabs-content>

                            <v-tabs-content id='fit-data'>
                            <v-fitted-data-table :fitted-data='props.fittedData' :file-to-fit='props.fileToFit'></v-fitted-data-table>
                            </v-tabs-content>
                        </v-tabs-items>
                        </v-tabs>
                    </v-tabs-content>

                    <!-- metadata tab content -->
                    <v-tabs-content id='tab-metadata' ripple v-if='props.metadataLength > 0'>
                        <v-tabs mobile-break-point='300px'>
                        <v-tabs-bar dark color='blue lighten-3'>
                            <v-tabs-slider color='yellow'></v-tabs-slider>
                            <v-tabs-item v-for='(item, filename) in props.metadata' :key='filename' :href='`#md-${filename}`'>
                            {{filename}}
                            </v-tabs-item>
                        </v-tabs-bar>

                        <v-tabs-items>
                            <v-tabs-content v-for='(item, filename) in props.metadata' :key='filename' :id='`md-${filename}`'>
                            <v-card flat>
                                <v-card-text v-if='props.metadataLength > 0'>
                                <v-metadata-table :metadata='item'></v-metadata-table>
                                </v-card-text>

                                <v-card-text v-else>
                                No metadata to be shown.
                                </v-card-text>
                            </v-card>
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
import parseData from '../../assets/js//readFiles/parse/TAS';

export default {
  name: 'TAS',
  mixins: [
    read1DData,
    parseData,
    filesToPlotWatcher,
  ],
  components: {
    'v-chart': () => import('../Chart1D/ChartTAS'),
    'v-fit-results-table': () => import('../FitResultsTable/FitResultsTableTAS'),
    'v-fitted-data-table': () => import('../FittedDataTable'),
    'v-metadata-table': () => import('../MetadataTable'),
  },
  computed: {
    ...mapState('TAS', {
      ID: state => state.ID,
      filesToPlot: state => state.filesSelected,
      fileToFit: state => state.fileToFit,
    }),
    ...mapGetters('TAS', [
      'getURLs',
      'getSavedFile',
    ]),
  },
  methods: {
    ...mapMutations('TAS', [
      'setCurrentData',
      'resetFitConfiguration',
      'storeData',
      'resetAll',
      'transformData',
    ]),
  },
  watch: {
    fileToFit() {
      if (this.fileToFit === null) {
        this.resetFitConfiguration();
      }
    },
  },
};
</script>