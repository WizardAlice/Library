const config = {
  chart: {
      type: 'column'
  },
  title: {
      text: 'My first Highcharts chart'
  },
  xAxis: {
      categories: ['苹果', '香蕉', '橙子']   //指定x轴分组
  },
  yAxis: {
      title: {
          text: 'something'
      }
  },
  tooltip: {
      headerFormat: '{series.name}<br>',
      pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
  },
}

let suibian={series : [{
      type: 'pie',
      name: '浏览器访问量占比',
      data: [
          ['Firefox',   45.0],
          ['IE',       26.8],
          {
              name: 'Chrome',
              y: 12.8,
              sliced: true,
              selected: true
          },
          ['Safari',    8.5],
          ['Opera',     6.2],
          ['其他',   0.7]
      ]
  }]}

  console.log(Object.assign(config,suibian).series[0].data)