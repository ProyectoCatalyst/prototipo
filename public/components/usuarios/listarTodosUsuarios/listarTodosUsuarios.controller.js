(() => {
  'use strict';
  angular
      .module('prototipo')
      .controller('controladorListarTodosUsuarios', controladorListarTodosUsuarios);

      controladorListarTodosUsuarios.$inject = ['$stateParams', '$state', 'servicioUsuarios'];

  function controladorListarTodosUsuarios($stateParams, $state, servicioUsuarios) {
      let vm = this;

    vm.listarUsuarios = servicioUsuarios.obtenerlistadeusuarios();

    listarUsuarios();

    function listarUsuarios()  {
      vm.listarUsuarios = servicioUsuarios.obtenerlistadeusuarios();
    }
  }
})();