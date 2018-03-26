(() => {
  'use strict';

  angular
    .module('prototipo')
    .controller('controladorMostrarEstadoPaquete', controladorMostrarEstadoPaquete);

  controladorMostrarEstadoPaquete.$inject = ['$stateParams', '$state', '$http', 'servicioPaquetes'];
  function controladorMostrarEstadoPaquete($stateParams, $state, $http, servicioPaquetes) {
    let vm = this;

    let objPaqueteSinFormato = JSON.parse($stateParams.objPaqueteEstado);

    let objPaqueteTemp = new Paquete(objPaqueteSinFormato.trackingPaquete, objPaqueteSinFormato.tipoPaquete,objPaqueteSinFormato.pesoPaquete, objPaqueteSinFormato.precioPaquete, objPaqueteSinFormato.estadoPaquete);

    vm.paqueteActivo = objPaqueteSinFormato.trackingPaquete;
    vm.mostrarPaquete = objPaqueteSinFormato;

    vm.modificarEstadoPaquete = (pestadoPaquete) => {
      $state.go('main.modificarEstadoPaquete', {objPaqueteModEstado: JSON.stringify(pestadoPaquete) });
    }
    vm.regresar = () => {
      $state.go('main.listarPaquetesPrealertados')
    }



  }
})();