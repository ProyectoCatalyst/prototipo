(() => {
  'use strict';
  angular
    .module('prototipo')
    .service('servicioPaquetes', servicioPaquetes);

  servicioPaquetes.$inject = ['$q', '$log', '$http'];
  function servicioPaquetes($q, $log, $http) {

    let publicAPI = {
      prealertarPaquete: _prealertarPaquete,
      retornarPaquetesPrealertados: _retornarPaquetesPrealertados,
      numeroTracking: _numeroTracking
    }
    return publicAPI;

    function _prealertarPaquete(nuevoPaquetePrealertado) {

      let listaPaquetesPrealertados = _retornarPaquetesPrealertados();
 
      
    }// fin función agregarSucursal

    function _retornarPaquetesPrealertados(){

    }

    function _numeroTracking() {
      let numeroTracking = 0, numeroMin = 1, numeroMax = 99999;
      numeroTracking = Math.round((Math.random() * 9999999) + 1);
      return numeroTracking;
    }
  }
})();