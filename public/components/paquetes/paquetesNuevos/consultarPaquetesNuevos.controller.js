(() => {
  'use strict';
  angular
    .module('prototipo')
    .controller('controladorConsultarPaquetesNuevos', controladorConsultarPaquetesNuevos);

    controladorConsultarPaquetesNuevos.$inject = ['$stateParams', '$state', '$http'];

  function controladorConsultarPaquetesNuevos($stateParams, $state, $http ){
    let vm = this;

    //vm.consultarPaquetesNuevosAduana = servicioUsuarios

    
  }



})();