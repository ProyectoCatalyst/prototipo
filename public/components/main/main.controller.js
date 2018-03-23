(()=>{
  'use strict';
  angular
  .module('prototipo')
  .controller('controladorMain', controladorMain);

  controladorMain.$inject = ['$state', 'servicioInicioSesion'];

  function controladorMain($state, servicioInicioSesion){

    const userAuth = servicioInicioSesion.getAuthUser();

<<<<<<< HEAD
    // if(userAuth == undefined){
    //   $state.go('inicioSesion');
    // }
=======
    if(userAuth == undefined){
      $state.go('inicioSesion');
    }
>>>>>>> master

    const vm = this;

    vm.usuarioActivo = userAuth;

    vm.cerrarSesion = () => {
      swal({
        title: "Cerrar sesión",
        text: "¿Esta seguro que desea cerrar sesión",
        icon: "warning",
        buttons: true,
        buttons: "Sí",
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          servicioInicioSesion.logOut();
        }
      });
    }
  };
})();