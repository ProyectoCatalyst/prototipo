(() => {
  'use strict';
  angular
    .module('prototipo')
    .controller('controladorPerfil', controladorPerfil);

    controladorPerfil.$inject = ['$stateParams', '$state', '$window', 'servicioUsuarios', 'servicioAutenticacion', 'servicioUsuarioActivo'];

  function controladorPerfil($stateParams, $state, $window, servicioUsuarios, servicioAutenticacion, servicioUsuarioActivo) {
    let vm = this;

    vm.usuarioActivo = {};

    vm.usuarioActivo = servicioUsuarioActivo.usuarioActivo();

    vm.cerrarSesion = () => {
      servicioAutenticacion.logOut();
    }

  }
})();