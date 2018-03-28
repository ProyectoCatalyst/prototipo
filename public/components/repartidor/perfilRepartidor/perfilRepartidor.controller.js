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
      let repartidoresSucursal = servicioUsuarios.obtenerlistadeFiltrada(4);

      for(let i=0; i<repartidoresSucursal.length; i++){

        if(repartidoresSucursal[i].getCorreo() == correoActivo){

          $state.go('main.editarRepartidor', {datos: JSON.stringify(repartidoresSucursal[i])});
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