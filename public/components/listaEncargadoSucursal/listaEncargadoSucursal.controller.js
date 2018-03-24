(() => {
  'use strict';

  angular
    .module('prototipo')
    .controller('controladorListaEncargadoSucursal', controladorListaEncargadoSucursal)

  controladorListaEncargadoSucursal.$inject = [ '$stateParams','$state', 'servicioUsuarios']
  function controladorListaEncargadoSucursal($state, $stateParams, servicioUsuarios) {
    let vm = this;

    vm.listarEncargadoSucursal = servicioUsuarios.obtenerlistadeusuarios();

    // vm.prealertarPaquetes = () => {
    //   $state.go('main.prealertarPaquetes');
    // }

    vm.obtenerlistadeusuarios = servicioUsuarios.obtenerlistadeusuarios();

  }
})();

