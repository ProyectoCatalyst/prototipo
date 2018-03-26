(() => {
  'use strict';

  angular
    .module('prototipo')
    .controller('controladorlistaPaquetesPrealertados', controladorlistaPaquetesPrealertados)

  controladorlistaPaquetesPrealertados.$inject = [ '$stateParams','$state', 'servicioPaquetes']
  function controladorlistaPaquetesPrealertados( $stateParams, $state, servicioPaquetes) {
    let vm = this;

    vm.listarPaquetesPrealertados = servicioPaquetes.retornarPaquetesPrealertados();

    vm.estadoPaquete = (ppaquetesPrealertados) => {
      
      $state.go('main.estadoPaquete', { objPaqueteEstado: JSON.stringify(ppaquetesPrealertados) });
    }

    vm.agregarPaquetes = () => {
      $state.go('main.prealertarPaquetes')
    }

    vm.retornarPaquetesPrealertados = servicioPaquetes.retornarPaquetesPrealertados();

  }
})();