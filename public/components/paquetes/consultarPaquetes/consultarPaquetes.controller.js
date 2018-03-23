(() => {
  'use strict';
  angular
    .module('prototipo')
    .controller('controladorPaquetesPrealertados', controladorPaquetesPrealertados);

    controladorPaquetesPrealertados.$inject = ['$stateParams','$state','$http'];

    function controladorPaquetesPrealertados($stateParams, $state, $http) {
      let vm = this;
      let datosCliente = JSON.parse($stateParams.cedula);
      
    //   vm.paquetesPrealertados = () => {
    //    let paquetes = servicio.retornarPaquetes(datosCliente), // todos (entregados, en transito, en aduanas...) los paquetes asociados al cliente con la cedula que envio.
    //         paqPrealertados = []
    //   for(let i=0; i<paquetes.length; i++){
    //     if(paquetes[i].getEstado() == 'prealerta'){
    //       paqPrealertados.push(paquetes[i]);
    //     }
    //   }
    //   return paqPrealertados // retorna todos los paquetes que se encontraron en estado prealerta
    // } 

    }
})();