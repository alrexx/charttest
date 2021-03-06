var canvas = document.getElementById( "FundsFlow" );

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
    responsive: true,
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
};
window.myBar = new Chart( canvas, config );
document.getElementById( "FundsFlow" ).onclick = function ( evt ) {
  try {
    var activePoints = myBar.getElementsAtEvent( evt );
    var firstPoint = activePoints[ 0 ];
    var secondPoint = activePoints[ 1 ];
    var label = myBar.data.labels[ firstPoint._index ];
    var inflow = myBar.data.datasets[ firstPoint._datasetIndex ].data[ firstPoint._index ];
    var outflow = myBar.data.datasets[ secondPoint._datasetIndex ].data[ secondPoint._index ];
    document.getElementById( "Month" ).innerText = label;
    document.getElementById( "In" ).innerText = "$" + inflow;
    document.getElementById( "Out" ).innerText = "-$" + ( outflow * -1 );
  } catch ( e ) {
    console.log( "no point selected" );
  }
};