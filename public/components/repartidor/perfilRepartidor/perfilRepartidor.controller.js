(() => {
  'use strict'

  angular
  .module('prototipo')
  .controller('controladorPerfilRepartidor', controladorPerfilRepartidor)

  controladorPerfilRepartidor.$inject = ['$stateParams', '$state', 'servicioUsuarios']
  function controladorPerfilRepartidor($stateParams, $state, servicioUsuarios){

    if(!$stateParams.datos){
      $state.go('listarTodosLosRepartidores')
    }

    let vm = this;

    let datosRepartidor = JSON.parse($stateParams.datos); // cedula, sucursal

    verificarPaquetesAsignados() // para verificarf si hay paquetes asignados cada que abro el perfil

    vm.consultarLicencias = () => {
      $state.go('listarLicencias', {datos: JSON.stringify(datosRepartidor)});
    } 
    vm.listarPaquetesAsignados = () => {
      let paquetesAsignados = servicioUsuarios.retornarPaquetesAsignados(datosRepartidor); // envia cedula y sucursal donde trabaja  
    }
    vm.editarPerfil = () => {
      let repartidoresSucursal = servicioUsuarios.retornarRepartidoresSucursal(datosRepartidor[1]);

      for(let i=0; i<repartidoresSucursal.length; i++){
        if(repartidoresSucursal[i].getCedula() == datosRepartidor[0]){
          // console.log(repartidoresSucursal[i]);

          $state.go('editarRepartidor', {datos: JSON.stringify(repartidoresSucursal[i])});
        }
      }

    }
    

    // ________funciones internas________
     function verificarPaquetesAsignados(){
      let paquetesAsignados = servicioUsuarios.retornarPaquetesAsignados(datosRepartidor);

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