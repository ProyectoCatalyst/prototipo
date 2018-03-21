(() => {
  'use strict'

  angular
  .module('prototipo')
  .controller('controladorRegistrarLicencia', controladorRegistrarLicencia)

  controladorRegistrarLicencia.$inject =['$stateParams', '$state', 'servicioRepartidor']
  function controladorRegistrarLicencia($stateParams, $state, servicioRepartidor){

    if(!$stateParams.datos){
      $state.go('listarTodosLosRepartidores');
    }
    
    let vm = this;

    let datosRepartidor = JSON.parse($stateParams.datos); // cedula, sucursal, nombre
    
    vm.nombreRepartidor = datosRepartidor[2];
    vm.registrarLicencia = (pnuevoRegistro) => {

      if(!pnuevoRegistro.estado){
        pnuevoRegistro.estado = true;
      }
      
      let objLicencia = new Licencia(pnuevoRegistro.codigo, pnuevoRegistro.fechaVencimiento, pnuevoRegistro.tipoLicencia, pnuevoRegistro.estado),
          existente = verificarLicencia(objLicencia),
          fechaValida = verificarFechaVencimiento(objLicencia.fechaVencimiento),
          datosAgregar = [objLicencia, datosRepartidor[0], datosRepartidor[1]];

      if(existente){
        swal({
          title: 'La licencia ya esta en el sistema',
          body: 'Intenta con una que no este registrada',
          icon: 'error',
          button: 'Aceptar'
        });
      }else{
        
          if(fechaValida){
          swal({
            title: 'Hemos agregado la licencia',
            body: 'La licencia esta registrada en el sistema',
            icon: 'success',
            button: 'Aceptar'
          });
          servicioRepartidor.registrarLicencia(datosAgregar);

          $state.go('listarLicencias', {datos: JSON.stringify(datosRepartidor)});
        }else{
          swal({
            title: 'La licencia está vencida',
            body: 'No se puede registrar',
            icon: 'error',
            button: 'Aceptar'
          });
        }

      }
    }

    // __________funciones internas__________

    function verificarLicencia(pobjLicencia){
      let licenciasLS = servicioRepartidor.retornarTodasLicencias(),
          existente = false;

      for (let i=0; i<licenciasLS.length; i++){
        if(licenciasLS[i].codigo == pobjLicencia.codigo){
          existente = true;
        }
      }

      return existente
      
    }

    function verificarFechaVencimiento(pfecha){
      let hoy = new Date(),
      vencida = false;

      hoy.setHours(0,0,0,0);

      if(hoy>=pfecha){
        vencida = true
      }
      return !vencida
    }
  }
})();