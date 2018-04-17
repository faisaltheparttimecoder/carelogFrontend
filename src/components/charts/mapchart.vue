<template>
  <div>
    <br />
    <ve-map :data="mapData"
            :settings="chartSettings"
            height="750px"
            :legend-visible="false">
    </ve-map>
    <br />
    <table class="table is-narrow is-fullwidth is-hoverable is-striped">
      <thead class="subtitle" style="background-color: black">
        <tr>
          <th style="color: white !important; ">Customer Location</th>
          <th style="color: white !important; ">Total Customers </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="rows in chartData.rows">
          <th>{{ rows.location }}</th>
          <td> {{ rows['Total Customers'] }} </td>
        </tr>
      </tbody>
    </table>

  </div>


</template>

<script>
  import defaults from './../../mixins/default'
  export default  {
    mixins: [
      defaults
    ],
    data: function () {
      return {
        chartData: {
          columns: ['location', 'Total Customers'],
          rows: []
        },
        chartSettings: {
          position: 'world',
          label: false,
          selectData: true,
          // selectedMode: 'single',
          mapGrid: {
            top: '1px',
            bottom: '1px'
          },
          itemStyle: {
            normal: {
              borderColor: 'black',
              backgroundColor: 'rgba(128, 128, 128, 0.5)',
              borderWidth: 1
            }
          },
          zoom: 1
        }
      }
    },
    computed: {
      mapData: function () {
        var tempStoreHouse = {}
        this.axios.get(this.api.org).then(response => {
          for (let i in response.data) {
            if (!response.data[i]['archived']) {
              if (tempStoreHouse[response.data[i]['country']] === undefined) {
                tempStoreHouse[response.data[i]['country']] = 1
              } else {
                tempStoreHouse[response.data[i]['country']] = tempStoreHouse[response.data[i]['country']] + 1
              }
            }
          }
          for (let i in tempStoreHouse) {
            var chartRows = {}
            chartRows['location'] = i
            chartRows['Total Customers'] = tempStoreHouse[i]
            this.chartData.rows.push(chartRows)
          }
        })
        return this.chartData
      }
    }

  }
</script>
