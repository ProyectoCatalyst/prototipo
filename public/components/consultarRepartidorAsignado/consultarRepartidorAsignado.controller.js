(() => {
  'use strict';
  angular
    .module('prototipo')
    .controller('controladorConsultarRepartidorAsignado', controladorConsultarRepartidorAsignado);

    controladorConsultarRepartidorAsignado.$inject = ['$stateParams', '$state', '$http', 'servicio'];

  function controladorConsultarRepartidorAsignado($stateParams, $state, $http, servicio){
    let vm = this;

    //vm.consultarRepartidorAsignado = servicio

    
  }



})();