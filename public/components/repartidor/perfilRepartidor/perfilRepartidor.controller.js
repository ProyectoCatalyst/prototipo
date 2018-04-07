(() => {
  'use strict'

  angular
  .module('prototipo')
  .controller('controladorPerfilRepartidor', controladorPerfilRepartidor)

  controladorPerfilRepartidor.$inject = ['$stateParams', '$state', 'servicioUsuarios', 'servicioInicioSesion']
  function controladorPerfilRepartidor($stateParams, $state, servicioUsuarios, servicioInicioSesion){

    let vm = this;

    let correoActivo = (servicioInicioSesion.getAuthUser()).correo;

    verificarPaquetesAsignados();

    vm.consultarLicencias = () => {
      $state.go('main.listarLicencias', {correoActivo: JSON.stringify(correoActivo)});
    } 

    vm.listarPaquetesAsignados = servicioUsuarios.retornarPaquetesAsignados(correoActivo);

    vm.editarPerfil = () => {
      let repartidoresLS = servicioUsuarios.obtenerlistadeFiltrada(4);

      for(let i=0; i<repartidoresLS.length; i++){

        if(repartidoresLS[i].getCorreo() == correoActivo){

          $state.go('main.editarRepartidor', {datosMod: JSON.stringify(repartidoresLS[i])});
        }
      }

    }
    

    // ________funciones internas________
     function verificarPaquetesAsignados(){
      let paquetesAsignados = servicioUsuarios.retornarPaquetesAsignados(correoActivo);

      if(paquetesAsignados.length != 0){
        swal({
          title: 'Informacion del sistema',
          text: 'Hay paquetes asignados, por favor repartalos // simulacion con licencias, realmente no hay paquetes',
          icon: 'info',
          button: 'Aceptar'
        });
      }
    }
  }
})();