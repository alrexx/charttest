var ctx = document.getElementById( "mini_cashmovements" );
var myChart = new Chart( ctx, {
  type: 'bar',
  data: {
    labels: [ "INFLOW", "OUTFLOW" ],
    datasets: [
      {
        label: 'Inflows',
        data: [ 400 ],
        backgroundColor: "#9FC7F7",
        borderColor: "#9FC7F7",
        lineTension: 0,
        pointRadius: 0,
      },
      {
        label: 'Outflows',
        data: [ -200 ],
        borderColor: "#539BF0",
        backgroundColor: "#539BF0",
        fillOpacity: 0.8,
        lineTension: 0,
        pointRadius: 0,
      }
  ]
  },
  options: {
    animation: false,
    hover: { enabled: false, },
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
  }
} );