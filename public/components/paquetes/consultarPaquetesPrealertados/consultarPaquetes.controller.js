(() => {
  'use strict';
  angular
    .module('prototipo')
    .controller('controladorPaquetesPrealertados', controladorPaquetesPrealertados);

    controladorPaquetesPrealertados.$inject = ['$stateParams','$state','$http','servicioPaquetes'];

    function controladorPaquetesPrealertados($stateParams, $state, $http, servicioPaquetes) {
      let vm = this;
      
      vm.consultaPaquetesPrealertados = servicioPaquetes.retornarPaquetesPrealertados();

      vm.estadoPaquete = (pconsultaPaquetesPrealertados) => {
      
      $state.go('main.consultarPaquetesPrealertados', { objEstadoPaquete: JSON.stringify(pconsultaPaquetesPrealertados) });
     }

      vm.agregarPaquetes = () => {
      $state.go('main.consultarPaquetesPrealertados')
    }

      vm.retornarPaquetesPrealertados = servicioPaquetes.retornarPaquetesPrealertados();
      


    }
})();