(() => {
  'use strict';
  angular
      .module('prototipo')
      .controller('controladorListarTodosUsuarios', controladorListarTodosUsuarios);

      controladorListarTodosUsuarios.$inject = ['$stateParams', '$state', 'servicioUsuarios'];

  function controladorListarTodosUsuarios($stateParams, $state, servicioUsuarios) {
      let vm = this;

    vm.listarUsuarios = servicioUsuarios.obtenerListaPorEstados(true);

    vm.rolUsuario = ''

    vm.desactivar = (pusuario) => {
      swal({
        title: "¿Desea continuar con el proceso de desactivación?",
        text: "Una vez desactivado el usuario pasará a lista de desactivados",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          pusuario.setEstado(false);
          servicioUsuarios.actualizarUsuario(pusuario);
          swal("El usuario ha sido desactivado con exito", {
            icon: "success",
          });
         
        } else {
          swal("El usuario continua activo dentro del sistema");
        }
      });
      vm.listarUsuarios = servicioUsuarios.obtenerListaPorEstados(true);
    }

    vm.filtrarRolUsuario = (pidRol) => {
      vm.listarUsuarios = servicioUsuarios.obtenerlistadeFiltrada(pidRol);
    }
  }
})();