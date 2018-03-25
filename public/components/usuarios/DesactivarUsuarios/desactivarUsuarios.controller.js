(() => {
  'use strict';
  angular
      .module('prototipo')
      .controller('controladorListarDesactivados', controladorListarDesactivados);

      controladorListarDesactivados.$inject = ['$stateParams', '$state', 'servicioUsuarios'];

  function controladorListarTodosUsuarios($stateParams, $state, servicioUsuarios) {
      let vm = this;

    vm.listarUsuariosDesactivados = servicioUsuarios.obtenerListaDesactivados();

   // vm.rolUsuario = ''

   //  vm.filtrarRolUsuario = (pidRol) => {
   //   vm.listarUsuariosDesactivados = servicioUsuarios.obtenerlistadeFiltrada(pidRol);
   // }
  }
})();