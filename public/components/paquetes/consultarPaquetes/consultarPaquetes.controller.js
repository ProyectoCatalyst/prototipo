(() => {
  'use strict';
  angular
    .module('prototipo')
    .controller('controladorPaquetesPrealertados', controladorPaquetesPrealertados);

    controladorPaquetesPrealertados.$inject = ['$stateParams','$state','$http','servicio'];

    function controladorPaquetesPrealertados($stateParams, $state, $http, servicio) {
      let vm = this;
      
      //vm.paquetesPrealertados = servicio

    }
})();