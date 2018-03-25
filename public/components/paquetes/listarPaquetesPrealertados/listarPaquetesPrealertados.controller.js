(() => {
  'use strict';

  angular
    .module('prototipo')
    .controller('controladorlistaPaquetesPrealertados', controladorlistaPaquetesPrealertados)

  controladorlistaPaquetesPrealertados.$inject = [ '$stateParams','$state', 'servicioPaquetes']
  function controladorlistaPaquetesPrealertados($state, $stateParams, servicioPaquetes) {
    let vm = this;

    vm.listarPaquetesPrealertados = servicioPaquetes.retornarPaquetesPrealertados();

    vm.PaquetesPrealeconsultarEstadoPaquetertados = (paquetesPrealertados) => {
      $state.go('main.consultarEstadoPaquete', { objPaquetes: JSON.stringify(paquetesPrealertados) });
    }

    vm.agregarPaquetes = () => {
      $state.go('main.prealertarPaquetes');
    }

    vm.retornarPaquetesPrealertados = servicioPaquetes.retornarPaquetesPrealertados();

  }
})();