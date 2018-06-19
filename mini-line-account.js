//mini_accounts
var mini_accounts_canvas = document.getElementById( "mini_accounts" );
var mini_accounts_data = {
  labels: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun" ],
  datasets: [ {
    label: 'accounts',
    data: [ 5, 10, 15, 17, 20, 19 ],
    lineTension: 0.05,
    borderColor: '#539BF0',
    borderWidth: 6,
    pointRadius: 0,
    fill: false,
  }, {
    label: 'accounts',
    data: [ 5.5, 10.5, 15.5, 17.5, 20.5, 19.5 ],
    borderWidth: 0,
    pointRadius: 0,
    fill: false,
         } ]
};
var mini_accounts_options = {
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
};
var myChart = new Chart( mini_accounts_canvas, {
  type: 'line',
  data: mini_accounts_data,
  options: mini_accounts_options,
} );