var canvas = document.getElementById( "canvas1" );

// Apply multiply blend when drawing datasets
var multiply = {
  beforeDatasetsDraw: function ( chart, options, el ) {
    chart.ctx.globalCompositeOperation = 'multiply';
  },
  afterDatasetsDraw: function ( chart, options ) {
    chart.ctx.globalCompositeOperation = 'source-over';
  },
};

// Gradient color - this week
var gradientThisWeek = canvas.getContext( '2d' ).createLinearGradient( 0, 0, 0, 150 );
gradientThisWeek.addColorStop( 0, '#2c2fe0' );
gradientThisWeek.addColorStop( 1, '#7088d1' );

// Gradient color - previous week
var gradientPrevWeek = canvas.getContext( '2d' ).createLinearGradient( 0, 0, 0, 150 );
gradientPrevWeek.addColorStop( 0, '#cc2828' );
gradientPrevWeek.addColorStop( 1, '#ffffff' );

var chartdata = {
  labels: [ "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL" ],
  datasets: [ {
    type: "line",
    label: "This week",
    data: [ 24000, 18000, 16000, 18000, 24000, 36000, 28000 ],
    backgroundColor: gradientThisWeek,
    pointBackgroundColor: '#FFFFFF',
    pointBorderColor: '#FFFFFF',
    lineTension: 0.2,
    yAxisID: "y-axis-0",
    }, {
    type: "line",
    borderDash: ( [ 15, 5 ] ),
    label: 'Previous week',
    data: [ 12, 20, 16, 16, 10, 2, 7 ],
    backgroundColor: '#FFF',
    borderColor: '#cc2828',
    pointBackgroundColor: '#FFFFFF',
    pointBorderColor: '#FFFFFF',
    lineTension: 0.2,
    yAxisID: "y-axis-1",
    } ]
};

var config = {
  type: 'line',
  data: chartdata,
  options: {
    layout: {
      margin: {
        top: 5,
      },
    },
    elements: {
      point: {
        radius: 0,
        hitRadius: 5,
        hoverRadius: 5
      }
    },
    legend: {
      display: false,
    },
    responsive: true,
    scales: {
      xAxes: [ {
        display: false,
        stacked: true,
            } ],
      yAxes: [ {
        stacked: true,
        position: "left",
        display: false,
        id: "y-axis-0",
        ticks: {
          beginAtZero: true,
        },
            }, {
        stacked: true,
        position: "right",
        display: false,
        id: "y-axis-1",
        ticks: {
          beginAtZero: true,
        },
      } ]
    }
  },
  plugins: [ multiply ],
};

window.chart = new Chart( canvas, config );