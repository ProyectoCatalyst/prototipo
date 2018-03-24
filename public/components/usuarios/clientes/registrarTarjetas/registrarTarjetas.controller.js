(() => {
  'use strict';
  angular
    .module('prototipo')
    .controller('controladorRegistrarTarjetas', controladorRegistrarTarjetas);

    controladorRegistrarTarjetas.$inject = ['$http', '$stateParams', '$state', 'servicioUsuarios'];

    function controladorRegistrarTarjetas($http, $stateParams, $state, servicioUsuarios) {
      let vm = this;
    
      vm.tarjetaNueva = {};

      vm.registrarTarjeta = (pptarjetaNueva, pnumeroTarjeta) => {

        let objTarjeta = new Tarjeta

       

      };
    
    
    







    }
})();