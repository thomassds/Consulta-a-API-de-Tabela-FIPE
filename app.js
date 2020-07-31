/* Endpoint para pegar a lista de marcas
  - Ao carregar a página este endpoint deve ser acionado
  
  `https://parallelum.com.br/fipe/api/v1/carros/marcas`
*/




var listOption = document.querySelector('#marca, select');
var itenOption = document.querySelector('#inputOption, option');
var marcas = [];
var brandId;
var modelId;
var detailCars = [];

function consultaMarca(){
  fetch("https://parallelum.com.br/fipe/api/v1/carros/marcas")
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    for(i = 0; i <=90 ; i++){
      marcas.push(data[i]);
      
    }
    listMarcas(marcas);
  });
  }
  
  function listMarcas(marcas){
    for(marca of marcas) {
      var marcaElement = document.createElement('option');
      var marcaText = document.createTextNode(marca.nome);

      marcaElement.appendChild(marcaText);
      listOption.appendChild(marcaElement);
    }
  }

  consultaMarca();
  listOption.onchange = listarmodelos;                             
  
/* Endpoint para pegar a lista de modelos de carros da marca selecioanda 
  - Deve ser informado o ID da marca no link, exemplificado por: ${brandId}
  
  `https://parallelum.com.br/fipe/api/v1/carros/marcas/${brandId}/modelos`

*/

var optionModel = document.querySelector('#Modelo select');
var modelos = [];

function listarmodelos(){
  var nome = itenOption.value;
  for(i=0; i<=90;){
    if( marcas[i].nome == nome ){
      brandId = marcas[i].codigo;
    i=90;
    }
    i++;
  }
  
 
  fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${brandId}/modelos`)
    
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    modelos = [];    
    for(i=0;i<=data.modelos.length;i++){
    modelos.push(data.modelos[i]);
    }
    listModelos(modelos);
  });
}


function listModelos(modelos){
  for(modelo of modelos) {
    var modeloElement = document.createElement('option');
    var modeloText = document.createTextNode(modelo.nome);

    modeloElement.appendChild(modeloText);
    optionModel.appendChild(modeloElement);
  }
}
                              

optionModel.onchange = consultYear;

/* Endpoint para pegar a lista de anos de lançamento do modelo selecionado
  - Deve ser informado o ID da marca e do modelo, exemplificado por: ${brandId} e ${modelId}
  
  `https://parallelum.com.br/fipe/api/v1/carros/marcas/${brandId}/modelos/${modelId}/anos`
*/
var year = [];
function consultYear(){
  var modelName = optionModel.value;
  for(i=0; i<=modelos.length;){
    if( modelos[i].nome == modelName ){
      modelId = modelos[i].codigo;
    i=modelos.length;
    }
    i++;
  }

  fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${brandId}/modelos/${modelId}/anos`)
    
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    year=[];
    for(i=0;i<=data.length;i++){
      year.push(data[i]);
      }  
      infoCars(year);
  });
}

/* Endpoint para pegar a lista do valor por ano de lançamento
  - Deve ser informado o ID da marca, do modelo e do ano, exemplificado por: ${brandId}, ${modelId} e ${yearId}

  `https://parallelum.com.br/fipe/api/v1/carros/marcas/${brandId}/modelos/${modelId}/anos/${yearId}`
*/
var value;
var ano = 0;
function infoCars(year){
  
  for(i = 0; i <= year.length; i++){
  var yearId = year[i].codigo;
  fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${brandId}/modelos/${modelId}/anos/${yearId}`)

  .then(function(response){
    return response.json();
  })
  .then(function(data){
    detailCars.push(data);
    console.log(data);
    
    
    if(ano <= data.AnoModelo){
      ano = data.AnoModelo;
      value = data.Valor;
      setInput();
    }
  });
  }
}
var inputElement = document.querySelector('#validationDefault05, input ');

function setInput(){
  inputElement.nodeValue;
  inputElement.value = value;
}

var elementList = document.querySelector('#Cars, td');
var test = ["1" ,  "camaro", "amarelo", "2010", "20.000"];
/* Manipulando a list do home com valores importados da Api*/
function createTable(){
  
  for (teste of test){
    var tdElement = document.createElement('td');
    var tdText = document.createTextNode(teste);

    tdElement.appendChild(tdText);
    elementList.appendChild(tdElement);
  }
}
// optionModel.onchange = createTable;




/* globals Chart:false, feather:false */


(function () {
  'use strict'

  feather.replace()

  // Graphs
  var ctx = document.getElementById('myChart')
  // eslint-disable-next-line no-unused-vars
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [
        '2016',
        '2017',
        '2018',
        '2019',
        '2020'
      ],
      datasets: [{
        data: [
          130.00,
          180.00,
          199.00,
          235.00,
          250.00,
          
        ],
        lineTension: 0,
        backgroundColor: 'transparent',
        borderColor: '#007bff',
        borderWidth: 4,
        pointBackgroundColor: '#007bff'
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false
          }
        }]
      },
      legend: {
        display: false
      }
    }
  })
}())
