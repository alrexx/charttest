var mini_FUA_canvas = document.getElementById( "mini_FUA" );
var myChart = new Chart( mini_FUA_canvas, {
  type: 'line',
  data: {
    labels: [ "JAN", "FEB", "MAR", "APR", "MAY", "JUN" ],
    datasets: [ {
        label: 'Cash',
        data: [ 12, 19, 3, 5, 2, 3 ],
        backgroundColor: "#9FC7F7",
        borderColor: "#9FC7F7",
        lineTension: 0,
        pointRadius: 0,
      },
      {
        label: 'Total',
        data: [ 20, 24, 13, 20, 14, 16 ],
        borderColor: "#539BF0",
        backgroundColor: "#539BF0",
        fillOpacity: 0.8,
        lineTension: 0,
        pointRadius: 0,
          } ]
  },
  options: {
    animation: false,
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
    scales: {
      xAxes: [ {
        display: false,
            } ],
      yAxes: [ {
        display: false,
        ticks: {
          beginAtZero: true,
        },
    } ]
    },
    title: {
      display: false,
    }
  }
} );