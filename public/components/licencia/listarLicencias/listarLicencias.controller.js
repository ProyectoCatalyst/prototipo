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
    vm.listarLicenciasActivas = listaLicenciasActivas();
    vm.listarLicenciasDesactivadas = listarLicenciasDesactivadas();
    vm.agregarLicencia = () => {
      $state.go('registrarLincencia', {datos: JSON.stringify(datosRepartidor)});
    }
    vm.cambiarEstado = (pdatosLicencia) => {
      let datos = [datosRepartidor[0], datosRepartidor[1], pdatosLicencia.codigo];

      servicioRepartidor.cambiarEstado(datos);
      $state.reload();
    }


    // ________funciones internas__________
    function listaLicenciasActivas(){
      let datos = [datosRepartidor[0], datosRepartidor[1]],
      // me retorna los repartidores que existen en su misma sucursal, ahora busco el repartidor cuya licencia coincide con la recibida de la vista anterior y llamo las licencias de el en el array licenciasRepartidor
          licenciasActivas = servicioRepartidor.retornarLicencias(datos);
      return licenciasActivas[0]
    }

    function listarLicenciasDesactivadas(){
      let datos = [datosRepartidor[0], datosRepartidor[1]],
          licenciasDesactivadas = servicioRepartidor.retornarLicencias(datos);

      return licenciasDesactivadas[1]
    }

  }
})();