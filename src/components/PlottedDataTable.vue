<template>
<div class='text-cs-center'>
    <v-data-table
      :headers='headers'
      :items='data'
      class='text-xs-center'>
      <template slot='items' slot-scope='props'>
        <td class='text-xs-left' v-for='(item, index) in fieldnames' :key='index'>{{props.item[item]}}</td>
      </template>
      <template slot='no-data'>
        <v-alert :value='true' color='error' icon='warning'>
          No data to display.
        </v-alert>
      </template>
    </v-data-table>
</div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'PlottedDataTable',
  data() {
    return {
      sheet: false,
    };
  },
  props: {
    plottedData: {
      type: Array,
      required: true,
    },
  },
  computed: {
    data() {
      return _.flatten(this.plottedData.map(el => el.values));
    },
    fieldnames() {
      if (this.data.length === 0) return [];
      return Object.keys(this.data[0]);
    },
    headers() {
      // eslint-disable-next-line
      return this.fieldnames.map((key) => {
        return {
          align: 'left',
          text: key,
          value: key,
        };
      });
    },
  },
};

</script>

<style lang='scss'>
table.table thead td:not(:nth-child(1)),
table.table tbody td:not(:nth-child(1)),
table.table thead th:not(:nth-child(1)),
table.table tbody th:not(:nth-child(1)),
table.table thead td:first-child,
table.table tbody td:first-child,
table.table thead th:first-child,
table.table tbody th:first-child {
  padding: 0 5px !important;
}

</style>