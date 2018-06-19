//mini_advicepie
var mini_advicepie_ctx = document.getElementById( "mini_advicepie" );

var mini_advicepie_data = {
  datasets: [ {
    backgroundColor: [
      "#539BF0",
      "#9FC7F7"
    ],
    data: [ 67, 33 ],
    borderWidth: [ 0, 0 ],
  } ]
};
var mini_advicepie_options = {
  type: 'doughnut',

  data: mini_advicepie_data,
  options: {
    maintainAspectRatio: false,
    hover: { mode: null },
    animation: false,
    legend: {
      display: false,
    },
    cutoutPercentage: 75,
    tooltips: {
      enabled: false,
    }
  }
};
var myChart = new Chart( mini_advicepie_ctx, mini_advicepie_options );