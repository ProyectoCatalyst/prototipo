(() => {
  'use strict';
  angular
      .module('prototipo')
      .controller('controladorListarTodosUsuarios', controladorListarTodosUsuarios);

      controladorListarTodosUsuarios.$inject = ['$stateParams', '$state', 'servicioUsuarios'];

  function controladorListarTodosUsuarios($stateParams, $state, servicioUsuarios) {
      let vm = this;

    vm.listarUsuarios = servicioUsuarios.obtenerlistadeusuarios();

    vm.rolUsuario = ''

    vm.filtrarRolUsuario = (pidRol) => {
      vm.listarUsuarios = servicioUsuarios.obtenerlistadeFiltrada(pidRol);
    }
  }
})();