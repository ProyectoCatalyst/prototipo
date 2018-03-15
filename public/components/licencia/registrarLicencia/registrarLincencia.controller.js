(() => {
  'use strict'

  angular
  .module('prototipo', ['ngMessages'])
  .controller('controladorRegistrarLicencia', controladorRegistrarLicencia)

  controladorRegistrarLicencia.$inject =['$stateParams', '$state', 'servicioRegistroRepartidor']
  function controladorRegistrarLicencia($stateParams, $state, servicioRegistroRepartidor){
    if(!$stateParams.datos){
      $state.go('registrarRapartidor');
    }
    
    let vm = this,
        datosRepartidor = JSON.parse($stateParams.datos); // cedula, sucursal
    
    vm.nombreRepartidor = datosRepartidor[2];
    vm.registrarLicencia = (pnuevoRegistro) => {
      let objLicencia = new Licencia(pnuevoRegistro.codigo, pnuevoRegistro.fechaVencimiento, pnuevoRegistro.tipoLicencia),
          existente = verificarLicencia(objLicencia),
          datosAgregar = [objLicencia, datosRepartidor[0], datosRepartidor[1]];

          if(existente){
            swal({
              title: 'La licencia ya esta en el sistema',
              body: 'Intenta con una que no este registrada',
              icon: 'error',
              button: 'Aceptar'
            });
          }else{
            swal({
              title: 'Hemos agregado la licencia',
              body: 'La licencia esta registrada en el sistema',
              icon: 'success',
              button: 'Aceptar'
            });
            servicioRegistroRepartidor.registrarLicencia(datosAgregar);
          }
    }

    // __________funciones internas__________

    function verificarLicencia(pobjLicencia){
      let licenciasLS = servicioRegistroRepartidor.retornarTodasLicencias(),
          existente = false;

      for (let i=0; i<licenciasLS.length; i++){
        if(licenciasLS[i].getCodigo() == pobjLicencia.codigo){
          existente = true;
        }
      }
      return existente
    }
  }
})();