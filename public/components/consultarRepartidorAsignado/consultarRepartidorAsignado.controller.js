(() => {
  'use strict';
  angular
    .module('prototipo')
    .controller('controladorConsultarRepartidorAsignado', controladorConsultarRepartidorAsignado);

    controladorConsultarRepartidorAsignado.$inject = ['$stateParams', '$state', '$http', 'servicio'];

  function controladorConsultarRepartidorAsignado($stateParams, $state, $http, servicio){
    let vm = this;
    let datosPaquete = '12345';
    // let datosPaquete = JSON.parse($stateParams.datos);

    // info del paquete a consultar, recibe el codigo de prealerta y con eso va al servicio a buscar el repartidor con ese codigo de prealerta en su obj paquetes asignados.
    
    // vm.repartidor = servicio.retornarRepartidor(datosPaquete);
    
  }



})();