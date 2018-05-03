<template>
<v-container fluid pa-5 style='position: absolute; left: 0; right: 0;'>
  <v-card>
    <v-card-text>
        <v-layout row wrap>
          <!-- disable button if there is no files fetched -->
          <v-flex xs12 sm4>
            <v-btn outline @click='onGetRunsData' :disabled='!isFilesAvailable'>Get Runs Data</v-btn>
            <p><small v-if='!isFilesAvailable' class='red--text'><sup>*</sup>No files available to get runs data. Fetch data first.</small></p>
          </v-flex>
          
          <v-flex xs12 sm4 pl-3 pr-3>
            <v-select
              :items='runsHeaders'
              item-text='text'
              item-value='value'
              v-model='excludeColumns'
              label='Exclude Columns'
              multiple
              chips
              deletable-chips
              bottom
              v-if='runsData.length'
            ></v-select>
          </v-flex>

          <v-flex xs12 sm4 pl-3 pr-3>
            <v-text-field append-icon='search' label='Search' single-line hide-details v-model='search' v-if='runsData.length'></v-text-field>
          </v-flex>
        </v-layout>
    </v-card-text>

    <v-card-text v-if='!isGettingRunsData'>
      <!-- Runs table: It will dynamically create a table that is sortable and searchable by the metadata from all files fetched or uploaded  -->
      <v-data-table :search='search' :headers='filteredRunsHeaders' :items='runsItems' class='text-xs-center' :rows-per-page-items='[5, 10, 25, 50, 100, { text: "All", value: -1 }]'>
        <template slot='items' slot-scope='props'>
          <td class='text-xs-left' v-for='(item, index) in filteredRunsHeaders' :key='index'>
            {{ typeof props.item[item.text] === 'undefined' ? '[No Value]' : props.item[item.text] }}
          </td>
        </template>

        <template slot='no-data'>
          <v-alert :value='true' color='error' icon='warning'>
            No data to display. Fetch data first.
          </v-alert>
        </template>
      </v-data-table>
    </v-card-text>

    <!-- show loading wheel if getting runs data -->
    <v-card-text v-else>
      <v-layout row>
        <v-flex xs12 offset-sm6>
          <v-progress-circular indeterminate :size='150' color='secondary'></v-progress-circular>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>

</v-container>
</template>

<script>
import { eventBus } from '../../assets/js/eventBus';

export default {
  name: 'RunsTable',
  data() {
    return {
      search: '',
      excludeColumns: [],
    };
  },
  computed: {
    runsHeaders() {
      if (this.runsData.length === 0) return [];
      let headerNames = new Set(['filename']);

      this.runsData.forEach((file) => {
        const keys = Object.keys(file.metadata);

        headerNames = new Set([...headerNames, ...new Set(keys)]);
      });

      headerNames = [...headerNames].map(header => ({
        text: header,
        align: 'left',
        sortable: true,
        value: header,
      }));

      return headerNames;
    },
    filteredRunsHeaders() {
      return this.runsHeaders.filter(header => this.excludeColumns.indexOf(header.text) === -1);
    },
    runsItems() {
      if (this.runsData.length === 0) return [];

      const result = this.runsData.map((curve) => {
        const filename = curve.filename;

        return { filename, ...curve.metadata };
      });


      return result;
    },
    isFilesAvailable() {
      return this.isFetchList || this.isUploadList;
    },
  },
  methods: {
    onGetRunsData() {
      this.getRunsData(this.$route.meta.group)
        .then(() => {
          this.setIsGettingRunsData(false);
        })
        .catch((error) => {
          this.setIsGettingRunsData(false);
          eventBus.$emit('add-notification', error.message, 'error');
        });
    },
  },
};
</script>

<style lang='scss'>
tr:nth-child(even) {
  background: whitesmoke;
}
</style>