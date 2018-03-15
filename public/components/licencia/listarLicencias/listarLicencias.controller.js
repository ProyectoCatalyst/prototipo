(() => {
  'use strict'

  angular
  .module('prototipo')
  .controller('controladorListarLicencias', controladorListarLicencias);

  controladorListarLicencias.$inject = ['$stateParams', '$state', 'servicioRepartidor'];
  function controladorListarLicencias($stateParams, $state, servicioRepartidor){
    if(!$stateParams.datos){
      $state.go('registrarRapartidor');
    }
    let vm = this;
    let datosRepartidor = JSON.parse($stateParams.datos); // cedula, sucursal, nombre
    vm.nombreRepartidor = datosRepartidor[2];
    vm.listarLicencias = listaLicenciasRepartidor();
    vm.agregarLicencia = () => {
      $state.go('registrarLincencia', {datos: JSON.stringify(datosRepartidor)});
    }

    // ________funciones internas__________
    function listaLicenciasRepartidor(){
      let repartidoresEnSucursal = servicioRepartidor.retornarRepartidores(datosRepartidor[1]), // me retorna los repartidores que existen en su misma sucursal, ahora busco el repartidor cuya licencia coincide con la recibida de la vista anterior y llamo las licencias de el en el array licenciasRepartidor
          licenciasRepartidor = [];

      for(let i=0; i<repartidoresEnSucursal.length; i++){
        if(repartidoresEnSucursal[i].getCedula() == datosRepartidor[0]){
          licenciasRepartidor = repartidoresEnSucursal[i].getLicencias();
        }
      }
      console.log(licenciasRepartidor)
      return licenciasRepartidor
    }
  }
})();