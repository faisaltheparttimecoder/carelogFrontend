<template>
  <ve-map :data="chartData"
          :settings="chartSettings"
          height="750px"
          :legend-visible="false">
  </ve-map>
</template>

<script>
  import defaults from './../../mixins/default'
  export default  {
    mixins: [
      defaults
    ],
    created: function () {
      this.chartData = {
        columns: ['location', 'GDP'],
        rows: [
          {'location': 'India', 'GDP': 123},
          {'location': 'United States', 'GDP': 1223},
          {'location': 'Germany', 'GDP': 2123},
          {'location': 'France', 'GDP': 4123},
          {'location': 'China', 'GDP': 4123}
        ]
      }
      this.chartSettings = {
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
  }
</script>
