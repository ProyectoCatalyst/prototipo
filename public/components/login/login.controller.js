(() => {
  'use strict';
  angular
    .module('prototipo')
    .controller('controladorInicioSesion', controladorInicioSesion);

  controladorInicioSesion.$inject = ['$stateParams', '$state', '$window', 'servicioUsuarios', 'servicioInicioSesion'];

  function controladorInicioSesion($stateParams, $state, $window, servicioUsuarios, servicioInicioSesion) {
    let vm = this;

    vm.usuario = {};

    vm.iniciarSesion = (pusuario) => {

      let inicioCorrecto = servicioInicioSesion.logIn(pusuario);

      if (inicioCorrecto == true){
        swal({
          title: "Inicio exitoso",
          text: "Bienvenido a Correos CR",
          icon: "success",
          button: "Aceptar"
        });
        $state.go('main');
      }else{
        swal({
          title: "Revise los datos",
          text: "Los datos ingresados no pertenecen a ninguna cuenta",
          icon: "error",
          button: "Aceptar"
        });
      }
    }

    vm.registrar = () => {
      $state.go('registroUsuarios');
    }
    
  }
})();