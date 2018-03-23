(() => {
  'use strict';

  angular
    .module('prototipo')
    .controller('controladorlistaPaquetesPrealertados', controladorlistaPaquetesPrealertados)

  controladorlistaPaquetesPrealertados.$inject = ['$state', '$stateParams', 'servicioPaquetes']
  function controladorlistaPaquetesPrealertados($state, $stateParams, servicioPaquetes) {
    let vm = this;

    vm.listarPaquetesPrealertados = servicioPaquetes.retornarPaquetesPrealertados();

    vm.modificarPaquetesPrealertados = (ppaquetesPrealertadosursal) => {
      $state.go('main.modificarEstado', { objSucursal: JSON.stringify(ppaquetePrealertado) });
    }

    vm.prealertarPaquetes = () => {
      $state.go('main.prealertarPaquetes');
    }

    vm.retornarPaquetesPrealertados = servicioPaquetes.retornarPaquetesPrealertados();

  }
})();