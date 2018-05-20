<!--Template to register the map chart-->
<template>
  <section class="container">
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
  </section>
</template>

<script>
  export default  {
    data: function () {
      return {
        chartData: {
          columns: ['location', 'Total Customers'],
          rows: []
        },
        // Map chart settings
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
      // Pull the data and convert to the echart format
      mapData: function () {
        var tempStoreHouse = {}
        this.get(this.api.org).then(response => {
          for (let i in response) {
            if (!response[i]['archived']) {
              if (tempStoreHouse[response[i]['country']] === undefined) {
                tempStoreHouse[response[i]['country']] = 1
              } else {
                tempStoreHouse[response[i]['country']] = tempStoreHouse[response[i]['country']] + 1
              }
            }
          }
          for (let i in tempStoreHouse) {
            var chartRows = {}
            chartRows['location'] = i
            chartRows['Total Customers'] = tempStoreHouse[i]
            this.chartData.rows.push(chartRows)
          }
        }).catch(error => {
          this.errorParser(this.mapLoadingFailure, error)
        })
        return this.chartData
      }
    }
  }
</script>
