(function () {
  'use strict'

  window.fetch('js/data.json', {
    method: 'get'
  })
  .then((response) => response.json())
  .then((json) => renderChart(json))
  .catch((err) => console.log(err))

  function renderChart (dataset) {
    let ctx = document.getElementById('algosChart')
    let barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: dataset.algoritmos.map((el) => el.algoritmo),
        datasets: [{
          label: 'score (%)',
          backgroundColor: [
                            'rgba(178,188,255,0.81)',
                            'rgba(153,172,255,0.82)',
                            'rgba(127,157,255,0.83)',
                            'rgba(102,141,255,0.84)',
                            'rgba(76,126,255,0.85)',
                            'rgba(51,110,255,0.86)',
                            'rgba(25,64,255,0.87)',
                            'rgba(0,19,255,1)'
                          ],
          borderColor: 'rgba(128,164,237, 1)',
          data: dataset.algoritmos.map((el) => el.score*100)
        }]
      },
      options: {
        onClick: clickHandler,
        onHover: clickHandler,
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }],
          xAxes: [{
            ticks: {
              autoSkip: false
            }
          }]
        }
      }
    });

    let cty = document.getElementById('succesChart')
    var barChartHor = new Chart(cty, {
    type: 'horizontalBar',
    data: {
      labels: ['Success','FAIL'],
      datasets: [{
        label: 'percent (%)',
        backgroundColor:[
                          'rgba(25,64,255,0.87)',
                          'rgba(255,19,0,1)'
                        ],
        borderColor: 'rgba(128,164,237, 1)',
        data: [dataset.success,1-dataset.success]
      }]
    },
    options: {
      onClick: clickHandlerSuc,
      responsive: true,
    }
    });

    function clickHandler (evt, element) {
      if (element.length) {
        let data = dataset.algoritmos[element[0]._index]
        let template = `<h5>#${data.algoritmo}</h5>
        <object type="image/svg+xml" data="imagen">
          Your browser does not support SVG
        </object>
<p>Acertó ${(data.score*100).toFixed(2)} veces (aprox) </p>`.replace('imagen',data.img)
        document.getElementById('selectedAlgo').innerHTML = template
      }
    }

    function clickHandlerSuc(evt, element) {
        let data = dataset.success
        let template = `<h5>Exito del ${data*100}% </h5>
              <p class="red-text">K=${((1-data)*100).toFixed(3)}% de CIE's inválidos  </p>`
        document.getElementById('selectedAlgo').innerHTML = template
    }

  }

  $(document).ready(function(){
    $('.tabs-wrapper .row').pushpin({ top: $('.tabs-wrapper').offset().top });
  });

}())
