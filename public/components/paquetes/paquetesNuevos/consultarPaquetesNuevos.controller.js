(() => {
  'use strict';
  angular
    .module('prototipo')
    .controller('controladorConsultarPaquetesNuevos', controladorConsultarPaquetesNuevos);

    controladorConsultarPaquetesNuevos.$inject = ['$stateParams', '$state', '$http', 'servicio'];

  function controladorConsultarPaquetesNuevos($stateParams, $state, $http, servicio ){
    let vm = this;

    //vm.consultarPaquetesNuevosAduana = servicioUsuarios

    
  }



})();