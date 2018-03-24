(()=>{
  'use strict';
  angular
  .module('prototipo')
  .controller('controladorMain', controladorMain);

  controladorMain.$inject = ['$state', 'servicioInicioSesion'];

  function controladorMain($state, servicioInicioSesion){

    const userAuth = servicioInicioSesion.getAuthUser();

    if(userAuth == undefined){
      $state.go('inicioSesion');
    }

    const vm = this;

    vm.usuarioActivo = userAuth;

    vm.cerrarSesion = () => {
      swal("¿Desea cerrar sesión?", {
        buttons: {
          cancel: "Volver al perfil",
          cerrarSesion: {
            text: "Cerrar sesión",
            value: "cerrarSesion",
          },
        },
      })
        .then((value) => {
          switch (value) {
            case "cerrarSesion":
              servicioInicioSesion.logOut();
              $state.go('landingPage');
          }
        });
    }
  };
})();