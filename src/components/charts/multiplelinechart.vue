<template>
  <ve-line  :data="multipleLineData"
            :colors="chartColors"
            :legend-position="legendPosition"
            :toolbox="modifiedToolbox"
            :loading="loading"
            :settings="chartSettings">
    <div class="data-empty" v-if="multipleLineData.rows.length===0">
      <app-nocontent :message="'No data available'">
      </app-nocontent>
    </div>
  </ve-line>
</template>

<script>

  import noContent from '../core/nocontent'
  import chartOptions from '../../mixins/chartOptions'
  import helpers from '../../mixins/helper'

  export default {
    props: [
      'data'
    ],
    mixins: [
      chartOptions, helpers
    ],
    components: {
      'app-nocontent': noContent,
    },
    data () {
      return {
        chartSettings: {},
        datacollection:  {
          columns: [],
          rows: []
        }
      }
    },
    computed: {
      modifiedToolbox: function() {
        this.toolbox.feature['magicType'] = {
          type: ['line', 'bar', 'stack', 'tiled', 'pie'],
          title: {
            line: "Line Chart",
            bar: "Bar Chart",
            stack: "Stacked",
            tiled: "Tiled"
          }
        }
       return this.toolbox
      },
      multipleLineData: function () {
        this.loading = true
        this.dataEmpty = false
        var columns = ['month'] // reset the columns since it duplicating
        var singleData = this.data[0]
        if (singleData !== undefined) {
          singleData = this.data[0]['collectors'][0]
          for (let i in singleData) {
            if (i !== 'month')
              columns.push(i)
          }
          this.datacollection = {
            columns: columns,
            rows: this.data[0]['collectors']
          }
          this.loading = false
          if (this.data[0]['is_the_data_empty']) {
            this.datacollection.rows = []
            this.dataEmpty = true
          }
        }
        return this.datacollection
      }
    },
  }
</script>
