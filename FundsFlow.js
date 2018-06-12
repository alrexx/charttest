// Gradient color - this week
var gradientBlue = canvas.getContext( '2d' ).createLinearGradient( 0, 0, 0, 150 );
gradientBlue.addColorStop( 0, '#2c2fe0' );
gradientBlue.addColorStop( 1, '#fff' );

// Gradient color - previous week
var gradientRed = canvas.getContext( '2d' ).createLinearGradient( 0, 0, 0, 150 );
gradientRed.addColorStop( 1, '#cc2828' );
gradientRed.addColorStop( 0, '#ffffff' );


var randomScalingFactor = function () {
  return ( Math.random() > 0.5 ? 1.0 : -1.0 ) * Math.round( Math.random() * 100 );
};
var randomColorFactor = function () {
  return Math.round( Math.random() * 255 );
};
var barChartData = {
  labels: [ "January", "February", "March", "April", "May", "June", "July" ],
  datasets: [
    {
      label: 'Trend Line',
      type: 'line',
      data: [ -150, 200, 300, -100, 100, 200, 300 ],
      borderWidth: 3,
      fill: false,
      borderDash: ( [ 4, 4 ] ),
      //backgroundColor: '#FFF',
      borderColor: '#666',
      //pointBackgroundColor: '#FFFFFF',
      //pointBorderColor: '#FFFFFF',
      pointRadius: 0,
  }, {
      label: 'Dataset 1',
      backgroundColor: gradientBlue,
      //backgroundColor: 'rgba(44,47,224,0.4)',
      data: [ 300, 500, 600, 700, 800, 900, 500 ],
      borderWidth: 0,
      borderColor: "#2c2fe0",
  }, {
      label: 'Dataset 2',
      backgroundColor: gradientRed,
      //backgroundColor: 'rgba( 204, 40, 40, 0.2 )',
      data: [ -240, -50, -700, -223, -535, -458, -928 ],
      borderWidth: 0,
      borderColor: "#cc2828",

  } ]
};
window.onload = function () {
  var ctx = document.getElementById( "FundsFlow" ).getContext( "2d" );
  window.myBar = new Chart( ctx, {
    type: 'bar',
    data: barChartData,
    options: {
      maintainAspectRatio: true,
      responsive: true,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [ {
          stacked: true,
          display: false,
          } ],
        yAxes: [ {
          stacked: true,
          display: false,
            } ]
      }
    }
  } );
};
$( '#randomizeData' ).click( function () {
  $.each( barChartData.datasets, function ( i, dataset ) {
    dataset.backgroundColor = 'rgba(' + randomColorFactor() + ',' + randomColorFactor() + ',' + randomColorFactor() + ',.7)';
    dataset.data = [ randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor() ];
  } );
  window.myBar.update();
} );