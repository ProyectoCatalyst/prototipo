(() => {
  'use strict';
  angular
    .module('prototipo')
    .service('servicioConvenio', servicioConvenio);

    servicioConvenio.$inject = ['$stateParams','$state','$http','servicioConvenio']; 
  
  function servicioConvenio($stateParams, $state, $http, servicioFiesta) {
  
    const asyncLocalStorage = {
      setItem: function (key, value) {
          return Promise.resolve().then(() => {
              let response = true;
              localStorage.setItem(key, JSON.stringify(value));
              return response
          });
      }
    }
    let publicAPI = {
      agregarConvenios: _agregarConvenios,
      retornarConvenio: _retornarConvenio
    }
    return publicAPI;
    
    function _agregarFiestas(pfiestaNueva) {

      let listaFiestas = _retornarFiesta();
      let costoFiesta = calcularCostoFiesta(pfiestaNueva.horas,pfiestaNueva.pilar,pfiestaNueva.andrey);
      listaFiestas.push(pfiestaNueva);
      alert(costoFiesta);
        localStorage.setItem('listaFiestasLS',JSON.stringify(listaFiestas));
      }

      function _retornarFiesta(){
        let listaFiestas = [];
        let listaFiestasLocal = JSON.parse(localStorage.getItem("listaFiestasLS"));
  
        if(listaFiestasLocal == null){
          listaFiestas = [];
        }else{
          listaFiestasLocal.forEach(obj => {
            
            let objFiestas = new Fiesta(obj.fecha,obj.horas,obj.pilar,obj.andrey);
            listaFiestas.push(objFiestas);
          })
        }
  
        return listaFiestas;
      }




    }
  })();