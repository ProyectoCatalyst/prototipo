(() => {
  'use strict';
  angular
    .module('prototipo')
    .controller('controladorListarDesactivados', controladorListarDesactivados);

  controladorListarDesactivados.$inject = ['$stateParams', '$state', 'servicioUsuarios'];

  function controladorListarDesactivados($stateParams, $state, servicioUsuarios) {
    let vm = this;

  //  vm.listarUsuarios = servicioUsuarios.obtenerlistadeusuarios();
  // vm.UsuarioDesactivado = {};

    vm.listarUsuariosDesactivados = servicioUsuarios.obtenerListaPorEstados(false);

    vm.activar = (pusuario) => {
      swal({
        title: "¿Desea continuar con el proceso de desactivación?",
        text: "Una vez desactivado el usuario pasará a lista de desactivados",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          pusuario.setEstado(true);
          servicioUsuarios.actualizarUsuario(pusuario);
          swal("El usuario ha sido activado con exito", {
            icon: "success",
          });
          console.log (pusuario);
        } else {
          swal("El usuario continua activo dentro del sistema");
        }
      });
      vm.listarUsuariosDesactivados = servicioUsuarios.obtenerListaPorEstados(false);
    }
   // vm.estadoUsuario = ''

   // vm.filtrarRolUsuario = (pidRol) => {
   //   vm.listarUsuariosDesactivados = servicioUsuarios.obtenerlistadeFiltrada(pidRol);
   // }
  }
})();