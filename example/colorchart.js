var canvas = document.getElementById( "FundsFlow" );

// Apply multiply blend when drawing datasets
var multiply = {
  beforeDatasetsDraw: function ( chart, options, el ) {
    chart.ctx.globalCompositeOperation = 'multiply';
  },
  afterDatasetsDraw: function ( chart, options ) {
    chart.ctx.globalCompositeOperation = 'source-over';
  },
};



var config = {
  type: 'bar',
  data: {
    labels: [ "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL" ],
    datasets: [
      {
        label: 'Inflows',
        data: [ 13412, 62351, 63415, 22512, 39058, 23456, 52325 ],
        fill: false,
        borderColor: 'rgba(255, 255, 255, 0.6)',
        borderWidth: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
          },
      {
        label: 'Outflows',
        data: [ -12378, -23423, -21387, -39745, -972, -12379, -29735 ],
        fill: false,
        borderColor: 'rgba(255, 255, 255, 0.6)',
        borderWidth: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
          }
        ]
  },
  options: {
    responsive: false,
    elements: {
      point: {
        radius: 6,
        hitRadius: 6,
        hoverRadius: 6
      }
    },
    barThickness: 0.2,
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
    scales: {
      xAxes: [ {
        display: false,
        stacked: true,
        } ],
      yAxes: [ {
        display: false,
        ticks: {
          beginAtZero: true,
        },
        } ]
    }
  },
  plugins: [ multiply ],
};

window.myBar = new Chart( canvas, config );
document.getElementById( "FundsFlow" ).onclick = function ( evt ) {
  var activePoints = myBar.getElementsAtEvent( evt );
  var firstPoint = activePoints[ 0 ];
  var secondPoint = activePoints[ 1 ];
  var label = myBar.data.labels[ firstPoint._index ];
  var inflow = myBar.data.datasets[ firstPoint._datasetIndex ].data[ firstPoint._index ];
  var outflow = myBar.data.datasets[ secondPoint._datasetIndex ].data[ secondPoint._index ];
  //alert(label + ": " + value + value2);
  document.getElementById( "Month" ).innerText = label;
  document.getElementById( "In" ).innerText = "$" + inflow;
  document.getElementById( "Out" ).innerText = "-$" + ( outflow * -1 );
};