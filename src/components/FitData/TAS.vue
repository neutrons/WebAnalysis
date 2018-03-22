<template>
  <div>
    <keep-alive>
        <v-chart ID='TAS-Fit'>
        <template slot-scope='props' slot='tabs-slot'>
            <v-slide-y-transition>
            <v-flex xs12 v-show='props.showTabs'>
                <v-tabs v-model='props.activeParentTab'>

                    <v-tabs-bar>
                      <v-tabs-item href='#tab-metadata' ripple v-if='props.metadataLength > 0'>Metadata</v-tabs-item>
                      <v-tabs-item href='#tab-fit' ripple v-if='props.fileToFit'>Fit</v-tabs-item>
                      <v-tabs-slider color='accent'></v-tabs-slider>
                    </v-tabs-bar>

                    <!-- nested tab items  -->
                    <v-tabs-items>

                      <!-- metadata tab content -->
                      <v-tabs-content id='tab-metadata' ripple v-if='props.metadataLength > 0'>
                          <v-tabs mobile-break-point='300px'>
                            <v-tabs-bar>
                              <v-tabs-slider color='accent'></v-tabs-slider>
                              <v-tabs-item v-for='(item, filename) in props.metadata' :key='filename' :href='`#md-${filename}`'>
                              {{filename}}
                              </v-tabs-item>
                            </v-tabs-bar>

                          <v-tabs-items>
                              <v-tabs-content v-for='(item, filename) in props.metadata' :key='filename' :id='`md-${filename}`'>
                                <v-card>
                                  <v-card-text v-if='props.metadataLength > 0' class='tab-card-text'>
                                    <v-metadata-table :metadata='item'></v-metadata-table>
                                  </v-card-text>

                                  <v-card-text v-else class='tab-card-text'>
                                    No metadata to be shown.
                                  </v-card-text>
                                </v-card>
                              </v-tabs-content>
                          </v-tabs-items>
                          </v-tabs>
                      </v-tabs-content>

                      <!-- fit results tab content -->
                      <v-tabs-content id='tab-fit' ripple v-if='props.fileToFit'>
                          <v-tabs>
                          <v-tabs-bar>
                              <v-tabs-slider color='accent'></v-tabs-slider>
                              <v-tabs-item href='fit-results'>
                                Fit Results
                              </v-tabs-item>

                              <v-tabs-item href='fit-data'>
                                Fitted Data
                              </v-tabs-item>
                          </v-tabs-bar>

                          <v-tabs-items>
                              <v-tabs-content id='fit-results'>
                                <v-card>
                                  <v-card-text class='tab-card-text'>
                                    <v-fit-results-table :x-scale='props.xScale'></v-fit-results-table>
                                  </v-card-text>
                                </v-card>
                              </v-tabs-content>

                              <v-tabs-content id='fit-data'>
                                <v-card>
                                  <v-card-text class='tab-card-text'>
                                    <v-fitted-data-table :fitted-data='props.fittedData' :file-to-fit='props.fileToFit'></v-fitted-data-table>
                                  </v-card-text>
                                </v-card>
                              </v-tabs-content>
                          </v-tabs-items>
                          </v-tabs>
                      </v-tabs-content>
                    </v-tabs-items>
                    <!-- end of nested tab items -->
                </v-tabs>
            </v-flex>
            </v-slide-y-transition>
        </template>
        </v-chart>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'TAS',
  components: {
    'v-chart': () => import('./FitChart/ChartTAS'),
    'v-fit-results-table': () => import('../FitResultsTable/FitResultsTableTAS'),
    'v-fitted-data-table': () => import('../FittedDataTable/FittedDataTableTAS'),
    'v-metadata-table': () => import('../MetadataTable'),
  },
};
</script>

<style lang='scss' scoped>
.tab-card-text {
  max-height: 350px;
  overflow-y: auto;
}
</style>